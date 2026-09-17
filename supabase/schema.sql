-- =====================================================================
--  Centre Diagnostic de Libreville — Évaluations RH
--  Schéma Supabase : tables, RLS et fonctions publiques par jeton
--  À exécuter dans SQL Editor (Supabase Studio), une seule fois.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- 1. Liens d'évaluation : une ligne = une URL envoyée à un évaluateur
-- ---------------------------------------------------------------------
create table if not exists public.evaluation_links (
  id               uuid primary key default gen_random_uuid(),
  token            text unique not null default encode(gen_random_bytes(16), 'hex'),
  template_key     text not null,

  -- Pré-rempli dans le formulaire : uniquement l'évaluateur.
  -- Le nom de la personne évaluée est volontairement laissé vide.
  evaluateur_nom   text,

  -- Destinataire du lien (= l'évaluateur), pour le suivi d'envoi
  destinataire_email text,
  destinataire_tel   text,          -- format international, ex. 24106000000
  canal            text check (canal in ('email', 'whatsapp', 'lien')) default 'lien',
  note_interne     text,

  statut           text not null default 'envoye'
                   check (statut in ('envoye', 'ouvert', 'soumis', 'expire', 'annule')),
  expire_le        timestamptz not null default (now() + interval '30 days'),
  cree_le          timestamptz not null default now(),
  ouvert_le        timestamptz,
  soumis_le        timestamptz,
  cree_par         uuid references auth.users (id) on delete set null
);

create index if not exists evaluation_links_template_idx on public.evaluation_links (template_key);
create index if not exists evaluation_links_statut_idx   on public.evaluation_links (statut);

-- ---------------------------------------------------------------------
-- 2. Évaluations soumises
-- ---------------------------------------------------------------------
create table if not exists public.evaluations (
  id               uuid primary key default gen_random_uuid(),
  link_id          uuid references public.evaluation_links (id) on delete set null,
  template_key     text not null,
  categorie        text not null,

  evalue_nom       text not null,
  evalue_matricule text,
  poste            text,
  service          text,
  type_contrat     text,
  date_debut       date,
  date_fin         date,
  evaluateur_nom   text,

  -- Toutes les réponses du formulaire, structurées par le front :
  -- { criteres: {c1: 4, ...}, notes: {q1: 8, ...}, reponses: {q1: "..."},
  --   points_forts: [], axes_amelioration: [], commentaires_agent: "" }
  reponses         jsonb not null default '{}'::jsonb,

  score_total      integer,
  score_max        integer,
  pourcentage      numeric(5,2),
  appreciation     text,
  avis_renouvellement text,

  soumis_le        timestamptz not null default now()
);

create index if not exists evaluations_template_idx on public.evaluations (template_key);
create index if not exists evaluations_date_idx     on public.evaluations (soumis_le desc);

-- ---------------------------------------------------------------------
-- 3. RLS — rien n'est lisible sans être connecté
-- ---------------------------------------------------------------------
alter table public.evaluation_links enable row level security;
alter table public.evaluations      enable row level security;

drop policy if exists "admin lit les liens"        on public.evaluation_links;
drop policy if exists "admin gere les liens"       on public.evaluation_links;
drop policy if exists "admin lit les evaluations"  on public.evaluations;
drop policy if exists "admin gere les evaluations" on public.evaluations;

create policy "admin lit les liens"
  on public.evaluation_links for select
  to authenticated using (true);

create policy "admin gere les liens"
  on public.evaluation_links for all
  to authenticated using (true) with check (true);

create policy "admin lit les evaluations"
  on public.evaluations for select
  to authenticated using (true);

create policy "admin gere les evaluations"
  on public.evaluations for all
  to authenticated using (true) with check (true);

-- Le rôle anon n'a AUCUNE policy : il ne peut ni lire ni écrire
-- directement. Il passe obligatoirement par les trois fonctions ci-dessous.

-- ---------------------------------------------------------------------
-- 4. Accès public, strictement limité au jeton
-- ---------------------------------------------------------------------

-- 4.1 Ouvrir un formulaire à partir de son jeton
create or replace function public.get_form_by_token(p_token text)
returns table (
  template_key   text,
  evaluateur_nom text,
  statut         text,
  expire_le      timestamptz
)
language plpgsql security definer set search_path = public as $$
begin
  return query
  select l.template_key, l.evaluateur_nom,
         case when l.expire_le < now() and l.statut <> 'soumis'
              then 'expire' else l.statut end,
         l.expire_le
  from public.evaluation_links l
  where l.token = p_token;
end;
$$;

-- 4.2 Marquer le lien comme ouvert (première visite)
create or replace function public.mark_link_opened(p_token text)
returns void
language plpgsql security definer set search_path = public as $$
begin
  update public.evaluation_links
     set statut = 'ouvert', ouvert_le = coalesce(ouvert_le, now())
   where token = p_token and statut = 'envoye' and expire_le > now();
end;
$$;

-- 4.3 Soumettre l'évaluation remplie
create or replace function public.submit_evaluation(p_token text, p_payload jsonb)
returns uuid
language plpgsql security definer set search_path = public as $$
declare
  v_link public.evaluation_links%rowtype;
  v_id   uuid;
begin
  select * into v_link from public.evaluation_links where token = p_token;

  if not found then
    raise exception 'Lien introuvable';
  end if;
  if v_link.statut = 'soumis' then
    raise exception 'Cette évaluation a déjà été transmise';
  end if;
  if v_link.expire_le < now() then
    raise exception 'Ce lien a expiré';
  end if;
  if coalesce(trim(p_payload ->> 'evalue_nom'), '') = '' then
    raise exception 'Le nom de la personne évaluée est obligatoire';
  end if;

  insert into public.evaluations (
    link_id, template_key, categorie, evalue_nom, evalue_matricule,
    poste, service, type_contrat, date_debut, date_fin, evaluateur_nom,
    reponses, score_total, score_max, pourcentage, appreciation, avis_renouvellement
  ) values (
    v_link.id,
    v_link.template_key,
    p_payload ->> 'categorie',
    p_payload ->> 'evalue_nom',
    nullif(p_payload ->> 'evalue_matricule', ''),
    nullif(p_payload ->> 'poste', ''),
    nullif(p_payload ->> 'service', ''),
    nullif(p_payload ->> 'type_contrat', ''),
    nullif(p_payload ->> 'date_debut', '')::date,
    nullif(p_payload ->> 'date_fin', '')::date,
    coalesce(nullif(p_payload ->> 'evaluateur_nom', ''), v_link.evaluateur_nom),
    coalesce(p_payload -> 'reponses', '{}'::jsonb),
    (p_payload ->> 'score_total')::int,
    (p_payload ->> 'score_max')::int,
    (p_payload ->> 'pourcentage')::numeric,
    nullif(p_payload ->> 'appreciation', ''),
    nullif(p_payload ->> 'avis_renouvellement', '')
  ) returning id into v_id;

  update public.evaluation_links
     set statut = 'soumis', soumis_le = now()
   where id = v_link.id;

  return v_id;
end;
$$;

revoke all on function public.get_form_by_token(text)          from public;
revoke all on function public.mark_link_opened(text)            from public;
revoke all on function public.submit_evaluation(text, jsonb)    from public;

grant execute on function public.get_form_by_token(text)       to anon, authenticated;
grant execute on function public.mark_link_opened(text)         to anon, authenticated;
grant execute on function public.submit_evaluation(text, jsonb) to anon, authenticated;

-- ---------------------------------------------------------------------
-- 5. Vue de synthèse pour les KPI
-- ---------------------------------------------------------------------
create or replace view public.v_kpi_par_modele
with (security_invoker = true) as
select
  e.template_key,
  count(*)                                   as nb_evaluations,
  round(avg(e.pourcentage), 1)               as moyenne_pct,
  min(e.pourcentage)                         as min_pct,
  max(e.pourcentage)                         as max_pct,
  max(e.soumis_le)                           as derniere_soumission
from public.evaluations e
group by e.template_key;
