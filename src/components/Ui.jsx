import { tonPour } from '../lib/scoring';

/* ------------------------------------------------------------------ */
/*  Badges                                                             */
/* ------------------------------------------------------------------ */
const TONS = {
  neutre: 'bg-wash text-ink-soft',
  teal: 'bg-teal-50 text-teal-700 ring-1 ring-teal-100',
  sky: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
  warn: 'bg-warn-50 text-warn-600 ring-1 ring-warn-500/20',
  alert: 'bg-alert-50 text-alert-600 ring-1 ring-alert-500/20',
};

export function Badge({ children, ton = 'neutre' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TONS[ton]}`}>
      {children}
    </span>
  );
}

const TON_STATUT = { envoye: 'sky', ouvert: 'warn', soumis: 'teal', expire: 'alert', annule: 'neutre' };
const LIB_STATUT = {
  envoye: 'Envoyé',
  ouvert: 'Ouvert',
  soumis: 'Reçu',
  expire: 'Expiré',
  annule: 'Annulé',
};

export const BadgeStatut = ({ statut }) => (
  <Badge ton={TON_STATUT[statut] || 'neutre'}>{LIB_STATUT[statut] || statut}</Badge>
);

export function BadgeAppreciation({ appreciation }) {
  if (!appreciation) return <span className="text-ink-faint">—</span>;
  const t = tonPour(appreciation);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${t.fond} ${t.texte}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${t.barre}`} />
      {appreciation}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Indicateurs                                                        */
/* ------------------------------------------------------------------ */
export function Stat({ valeur, libelle, detail, accent = 'text-ink', barre }) {
  return (
    <div className="card p-5">
      <div className="text-xs font-medium uppercase tracking-wide text-ink-faint">{libelle}</div>
      <div className={`mt-2 font-serif text-3xl tabular-nums leading-none ${accent}`}>{valeur}</div>
      {barre != null && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-wash">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-500"
            style={{ width: `${Math.max(2, Math.min(100, barre))}%` }}
          />
        </div>
      )}
      {detail && <div className="mt-2 text-xs text-ink-faint">{detail}</div>}
    </div>
  );
}

/** Barres horizontales, sans dépendance graphique. */
export function BarList({ items, unite = '', max, vide = 'Pas encore de données.' }) {
  const total = items.reduce((t, i) => t + i.valeur, 0);
  if (!total) return <p className="text-sm text-ink-faint">{vide}</p>;
  const plafond = max ?? Math.max(1, ...items.map((i) => i.valeur));
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate text-ink-soft">{it.label}</span>
            <span className="shrink-0 font-medium tabular-nums">
              {it.valeur}
              {unite}
              {total > 0 && !unite && (
                <span className="ml-1 text-xs font-normal text-ink-faint">
                  {Math.round((it.valeur / total) * 100)}%
                </span>
              )}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-wash">
            <div
              className={`h-full rounded-full transition-[width] duration-500 ${it.couleur || 'bg-teal-400'}`}
              style={{ width: `${Math.max(2, (it.valeur / plafond) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Histogramme mensuel en SVG, avec valeur au survol. */
export function HistoMensuel({ donnees }) {
  if (!donnees.length) return <p className="text-sm text-ink-faint">Pas encore de données.</p>;
  const max = Math.max(1, ...donnees.map((d) => d.valeur));
  return (
    <div>
      <div className="flex h-28 items-end gap-1.5">
        {donnees.map((d) => (
          <div key={d.label} className="group relative flex flex-1 flex-col justify-end">
            <span className="mb-1 text-center text-[11px] font-medium tabular-nums text-ink-faint opacity-0 transition-opacity group-hover:opacity-100">
              {d.valeur}
            </span>
            <div
              className="rounded-t bg-brand transition-all duration-500 group-hover:opacity-80"
              style={{ height: `${Math.max(2, (d.valeur / max) * 88)}%` }}
              title={`${d.label} : ${d.valeur}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5 text-[11px] text-ink-faint">
        {donnees.map((d) => (
          <span key={d.label} className="flex-1 text-center">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  États                                                              */
/* ------------------------------------------------------------------ */
export function Vide({ titre, children, action }) {
  return (
    <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft text-lg text-teal-600">
        ○
      </span>
      <p className="font-serif text-lg">{titre}</p>
      {children && <div className="max-w-sm text-sm text-ink-faint">{children}</div>}
      {action}
    </div>
  );
}

/** Ossature de chargement : évite le saut de mise en page. */
export function Chargement({ lignes = 3 }) {
  return (
    <div className="animate-fade-in space-y-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Chargement…</span>
      <div className="h-8 w-56 rounded-lg bg-wash" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-wash" />
        ))}
      </div>
      {Array.from({ length: lignes }).map((_, i) => (
        <div key={i} className="h-20 rounded-xl bg-wash" />
      ))}
    </div>
  );
}

export function Erreur({ children }) {
  if (!children) return null;
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="animate-fade-in rounded-lg border border-alert-500/30 bg-alert-50 px-4 py-3 text-sm text-alert-600"
    >
      {children}
    </div>
  );
}

export function Succes({ children }) {
  if (!children) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-fade-in rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-700"
    >
      {children}
    </div>
  );
}

/** En-tête de page : titre, sous-titre, actions à droite. */
export function TitrePage({ titre, sousTitre, retour, children }) {
  return (
    <div className="no-print">
      {retour}
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl leading-tight">{titre}</h1>
          {sousTitre && <p className="mt-1 text-sm text-ink-faint">{sousTitre}</p>}
        </div>
        {children && <div className="flex flex-wrap gap-2">{children}</div>}
      </div>
    </div>
  );
}
