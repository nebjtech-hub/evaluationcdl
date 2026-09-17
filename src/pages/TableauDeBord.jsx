import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CATEGORIES, TEMPLATES } from '../lib/templates';
import { tonPour } from '../lib/scoring';
import { dateCourte, moisCourt } from '../lib/format';
import { BarList, Chargement, Erreur, HistoMensuel, Stat, TitrePage, Vide } from '../components/Ui';

const ACCENTS = {
  teal: { barre: 'bg-teal-400', puce: 'bg-teal-50 text-teal-700', bord: 'hover:border-teal-300' },
  sky: { barre: 'bg-sky-400', puce: 'bg-sky-50 text-sky-700', bord: 'hover:border-sky-300' },
  warn: { barre: 'bg-warn-500', puce: 'bg-warn-50 text-warn-600', bord: 'hover:border-warn-500/40' },
};

export default function TableauDeBord() {
  const [evaluations, setEvaluations] = useState([]);
  const [liens, setLiens] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [categorie, setCategorie] = useState('toutes');
  const [recherche, setRecherche] = useState('');

  useEffect(() => {
    (async () => {
      const [e, l] = await Promise.all([
        supabase
          .from('evaluations')
          .select(
            'id, template_key, categorie, evalue_nom, pourcentage, appreciation, avis_renouvellement, soumis_le',
          )
          .order('soumis_le', { ascending: false }),
        supabase.from('evaluation_links').select('id, template_key, statut, cree_le, expire_le'),
      ]);
      if (e.error || l.error) setErreur((e.error || l.error).message);
      setEvaluations(e.data || []);
      setLiens(l.data || []);
      setChargement(false);
    })();
  }, []);

  const kpi = useMemo(() => {
    const avecScore = evaluations.filter((e) => e.pourcentage != null);
    const moyenne = avecScore.length
      ? Math.round((avecScore.reduce((t, e) => t + Number(e.pourcentage), 0) / avecScore.length) * 10) / 10
      : null;
    const enAttente = liens.filter(
      (l) => (l.statut === 'envoye' || l.statut === 'ouvert') && new Date(l.expire_le) > new Date(),
    ).length;
    const recus = liens.filter((l) => l.statut === 'soumis').length;
    const tauxRetour = liens.length ? Math.round((recus / liens.length) * 100) : null;

    const parAppreciation = ['Excellent', 'Bien', 'Satisfaisant', 'Insuffisant'].map((a) => ({
      label: a,
      valeur: evaluations.filter((e) => e.appreciation === a).length,
      couleur: tonPour(a).barre,
    }));

    const parAvis = [
      ['Renouvellement recommandé', 'bg-teal-400'],
      ['Renouvellement sous réserve', 'bg-warn-500'],
      ['Non renouvellement', 'bg-alert-500'],
    ].map(([label, couleur]) => ({
      label,
      valeur: evaluations.filter((e) => e.avis_renouvellement === label).length,
      couleur,
    }));

    const mois = [];
    const now = new Date();
    for (let i = 5; i >= 0; i -= 1) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      mois.push({ label: moisCourt(d), cle: `${d.getFullYear()}-${d.getMonth()}`, valeur: 0 });
    }
    evaluations.forEach((e) => {
      const d = new Date(e.soumis_le);
      const m = mois.find((x) => x.cle === `${d.getFullYear()}-${d.getMonth()}`);
      if (m) m.valeur += 1;
    });

    return { total: evaluations.length, moyenne, enAttente, tauxRetour, parAppreciation, parAvis, mois };
  }, [evaluations, liens]);

  const statsParModele = useMemo(() => {
    const map = {};
    TEMPLATES.forEach((t) => {
      map[t.key] = { nb: 0, somme: 0, avecScore: 0, derniere: null, enAttente: 0 };
    });
    evaluations.forEach((e) => {
      const s = map[e.template_key];
      if (!s) return;
      s.nb += 1;
      if (e.pourcentage != null) {
        s.somme += Number(e.pourcentage);
        s.avecScore += 1;
      }
      if (!s.derniere || new Date(e.soumis_le) > new Date(s.derniere)) s.derniere = e.soumis_le;
    });
    liens.forEach((l) => {
      const s = map[l.template_key];
      if (s && (l.statut === 'envoye' || l.statut === 'ouvert')) s.enAttente += 1;
    });
    return map;
  }, [evaluations, liens]);

  const modelesAffiches = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return TEMPLATES.filter(
      (t) =>
        (categorie === 'toutes' || t.categorie === categorie) &&
        (!q || t.poste.toLowerCase().includes(q) || t.service.toLowerCase().includes(q)),
    );
  }, [categorie, recherche]);

  const recentes = evaluations.slice(0, 5);

  if (chargement) return <Chargement />;

  return (
    <div className="space-y-10">
      <TitrePage
        titre="Tableau de bord"
        sousTitre={`${kpi.total} évaluation${kpi.total > 1 ? 's' : ''} reçue${
          kpi.total > 1 ? 's' : ''
        } · ${TEMPLATES.length} formulaires disponibles`}
      >
        <Link to="/envoyer" className="btn-primary">
          Envoyer une évaluation
        </Link>
      </TitrePage>

      <Erreur>{erreur}</Erreur>

      {/* Indicateurs */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat valeur={kpi.total} libelle="Évaluations reçues" detail="Tous formulaires confondus" />
        <Stat
          valeur={kpi.moyenne != null ? `${kpi.moyenne} %` : '—'}
          libelle="Score moyen"
          barre={kpi.moyenne ?? 0}
          detail="Rapporté au barème de chaque grille"
          accent="text-teal-700"
        />
        <Stat
          valeur={kpi.tauxRetour != null ? `${kpi.tauxRetour} %` : '—'}
          libelle="Taux de retour"
          barre={kpi.tauxRetour ?? 0}
          detail={`${liens.length} lien${liens.length > 1 ? 's' : ''} envoyé${liens.length > 1 ? 's' : ''}`}
          accent="text-sky-700"
        />
        <Stat
          valeur={kpi.enAttente}
          libelle="En attente de réponse"
          detail={kpi.enAttente ? 'Pensez à relancer depuis Liens envoyés' : 'Rien à relancer'}
          accent={kpi.enAttente ? 'text-warn-600' : 'text-ink'}
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="card p-5">
          <h2 className="mb-4 text-sm font-semibold text-ink-soft">Répartition des appréciations</h2>
          <BarList items={kpi.parAppreciation} />
        </div>
        <div className="card p-5">
          <h2 className="mb-4 text-sm font-semibold text-ink-soft">Avis de renouvellement</h2>
          <BarList
            items={kpi.parAvis}
            vide="Aucun avis enregistré. Cette rubrique ne concerne que les grilles de fin de contrat."
          />
        </div>
        <div className="card p-5">
          <h2 className="mb-4 text-sm font-semibold text-ink-soft">Réceptions par mois</h2>
          <HistoMensuel donnees={kpi.mois} />
        </div>
      </section>

      {/* Dernières réceptions */}
      {recentes.length > 0 && (
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-rule px-5 py-3">
            <h2 className="text-sm font-semibold text-ink-soft">Dernières réceptions</h2>
            <Link to="/liens" className="text-xs text-teal-700 hover:underline">
              Suivi des envois
            </Link>
          </div>
          <ul className="divide-y divide-rule">
            {recentes.map((e) => {
              const t = TEMPLATES.find((x) => x.key === e.template_key);
              return (
                <li key={e.id}>
                  <Link
                    to={`/evaluations/${e.id}`}
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3 text-sm transition-colors hover:bg-wash"
                  >
                    <span className="font-medium">{e.evalue_nom}</span>
                    <span className="text-ink-faint">{t?.poste}</span>
                    <span className="ml-auto flex items-center gap-4 text-xs text-ink-faint">
                      {e.pourcentage != null && (
                        <span className="tabular-nums font-medium text-ink-soft">{e.pourcentage}%</span>
                      )}
                      {dateCourte(e.soumis_le)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Formulaires */}
      <section>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h2 className="font-serif text-lg">Formulaires</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategorie('toutes')}
              className={`chip ${categorie === 'toutes' ? 'chip-active' : ''}`}
            >
              Tous <span className="tabular-nums text-ink-faint">{TEMPLATES.length}</span>
            </button>
            {Object.entries(CATEGORIES).map(([cle, c]) => (
              <button
                key={cle}
                onClick={() => setCategorie(cle)}
                className={`chip ${categorie === cle ? 'chip-active' : ''}`}
              >
                {c.label}{' '}
                <span className="tabular-nums text-ink-faint">
                  {TEMPLATES.filter((t) => t.categorie === cle).length}
                </span>
              </button>
            ))}
          </div>
          <input
            className="field ml-auto max-w-xs"
            placeholder="Rechercher un poste ou un service"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>

        {modelesAffiches.length === 0 ? (
          <Vide titre="Aucun formulaire ne correspond">
            Essayez un autre terme ou revenez à l'ensemble des formulaires.
          </Vide>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modelesAffiches.map((t) => {
              const s = statsParModele[t.key] || { nb: 0, avecScore: 0, somme: 0 };
              const moyenne = s.avecScore ? Math.round((s.somme / s.avecScore) * 10) / 10 : null;
              const a = ACCENTS[CATEGORIES[t.categorie].accent];
              return (
                <Link key={t.key} to={`/modeles/${t.key}`} className={`card-link flex flex-col p-5 ${a.bord}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-serif text-base leading-snug">{t.poste}</p>
                      <p className="mt-0.5 text-xs text-ink-faint">{t.service}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${a.puce}`}>
                      {CATEGORIES[t.categorie].label}
                    </span>
                  </div>

                  <div className="mt-5 flex items-end gap-6">
                    <div>
                      <div className="font-serif text-2xl leading-none tabular-nums">{s.nb}</div>
                      <div className="mt-1 text-xs text-ink-faint">reçue{s.nb > 1 ? 's' : ''}</div>
                    </div>
                    <div>
                      <div className="font-serif text-2xl leading-none tabular-nums text-teal-700">
                        {moyenne != null ? `${moyenne}%` : '—'}
                      </div>
                      <div className="mt-1 text-xs text-ink-faint">moyenne</div>
                    </div>
                    {s.enAttente > 0 && (
                      <div>
                        <div className="font-serif text-2xl leading-none tabular-nums text-warn-600">
                          {s.enAttente}
                        </div>
                        <div className="mt-1 text-xs text-ink-faint">en attente</div>
                      </div>
                    )}
                  </div>

                  {moyenne != null && (
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-wash">
                      <div className={`h-full rounded-full ${a.barre}`} style={{ width: `${moyenne}%` }} />
                    </div>
                  )}

                  <p className="mt-4 border-t border-rule pt-3 text-xs text-ink-faint">
                    {s.derniere ? `Dernière réception le ${dateCourte(s.derniere)}` : 'Aucune réception'}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
