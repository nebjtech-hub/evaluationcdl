import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getTemplate } from '../lib/templates';
import { appreciationPour, calculerScore, pourcentage, tonPour } from '../lib/scoring';
import { dateCourte } from '../lib/format';
import Logo from '../components/Logo';
import { Erreur } from '../components/Ui';

const LIB_NOTES = ['Insuffisant', 'À améliorer', 'Satisfaisant', 'Bien', 'Excellent'];

/* ------------------------------------------------------------------ */
/*  Écran d'état (chargement, erreur, confirmation)                    */
/* ------------------------------------------------------------------ */
function Message({ titre, children, ton = 'neutre' }) {
  const puces = {
    neutre: 'bg-wash text-ink-faint',
    succes: 'bg-brand text-white',
    alerte: 'bg-alert-50 text-alert-600',
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto w-fit rounded-xl bg-white p-4 shadow-card">
          <Logo taille="lg" />
        </div>
        <div className="card mt-8 p-8">
          <span
            className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full text-xl ${puces[ton]}`}
          >
            {ton === 'succes' ? '✓' : ton === 'alerte' ? '!' : '○'}
          </span>
          <p className="mt-4 font-serif text-xl">{titre}</p>
          <div className="mt-2 text-sm text-ink-faint">{children}</div>
        </div>
        <p className="mt-6 text-xs text-ink-faint">
          Service des Ressources Humaines — Centre Diagnostic de Libreville
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Notation 1 à 5, navigable au clavier                               */
/* ------------------------------------------------------------------ */
function ChoixNote({ valeur, onChange, nom, manquant }) {
  const auClavier = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      onChange(Math.min(5, (valeur || 0) + 1));
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      onChange(Math.max(1, (valeur || 6) - 1));
    }
  };

  return (
    <div
      className={`flex gap-1 rounded-lg ${manquant ? 'ring-2 ring-alert-500/40 ring-offset-2' : ''}`}
      role="radiogroup"
      aria-label={nom}
      onKeyDown={auClavier}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const actif = valeur === n;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={actif}
            aria-label={`${n} — ${LIB_NOTES[n - 1]}`}
            tabIndex={actif || (!valeur && n === 1) ? 0 : -1}
            title={LIB_NOTES[n - 1]}
            onClick={() => onChange(actif ? '' : n)}
            className={`h-10 w-10 rounded-lg border text-sm font-semibold tabular-nums transition-all sm:h-9 sm:w-9 ${
              actif
                ? 'border-teal-600 bg-teal-600 text-white shadow-sm'
                : 'border-rule bg-white text-ink-faint hover:border-teal-400 hover:text-teal-700'
            }`}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sous-composants                                                    */
/*                                                                     */
/*  Ils sont définis ici, au niveau du module, et non dans le corps de */
/*  FormulairePublic : une fonction recréée à chaque rendu est vue par */
/*  React comme un nouveau type de composant, ce qui démonte puis      */
/*  remonte le sous-arbre — et fait perdre le focus au champ à chaque  */
/*  caractère saisi.                                                   */
/* ------------------------------------------------------------------ */
function Sommaire({ sommaire, onNaviguer }) {
  return (
    <nav className="space-y-1 text-sm">
      {sommaire.map((s) => {
        const complet = s.faits >= s.total;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={onNaviguer}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors hover:bg-wash"
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                complet ? 'bg-teal-600 text-white' : 'bg-wash text-ink-faint'
              }`}
            >
              {complet ? '✓' : s.total - s.faits}
            </span>
            <span className={`truncate ${complet ? 'text-ink-faint' : 'text-ink-soft'}`}>{s.titre}</span>
          </a>
        );
      })}
    </nav>
  );
}

function Section({ id, titre, indication, children }) {
  return (
    <section id={id} className="card scroll-mt-24 p-6">
      <h2 className="font-serif text-lg leading-snug">{titre}</h2>
      {indication && <p className="mt-1 text-sm text-ink-faint">{indication}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ChampNote({ valeur, onChange, bareme, libelle = 'Note' }) {
  return (
    <div className="mt-2 flex items-center gap-2 text-sm">
      <span className="text-ink-faint">{libelle}</span>
      <input
        type="number"
        min="0"
        max={bareme}
        inputMode="numeric"
        className="field w-20 py-1.5 text-center"
        value={valeur ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="text-ink-faint">/ {bareme}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Formulaire public                                                  */
/* ------------------------------------------------------------------ */
export default function FormulairePublic() {
  const { token } = useParams();
  const [etat, setEtat] = useState('chargement');
  const [lien, setLien] = useState(null);
  const [erreur, setErreur] = useState('');
  const [envoi, setEnvoi] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [brouillonVu, setBrouillonVu] = useState(false);
  const [enregistre, setEnregistre] = useState(false);
  const [manquants, setManquants] = useState([]);
  const [sommaireOuvert, setSommaireOuvert] = useState(false);

  const [infos, setInfos] = useState({
    evalue_nom: '',
    evalue_matricule: '',
    type_contrat: '',
    date_debut: '',
    date_fin: '',
    evaluateur_nom: '',
  });
  const [criteres, setCriteres] = useState({});
  const [reponses, setReponses] = useState({});
  const [notes, setNotes] = useState({});
  const [notesCas, setNotesCas] = useState({});
  const [noteCasPratique, setNoteCasPratique] = useState('');
  const [pointsForts, setPointsForts] = useState(['', '', '', '']);
  const [axes, setAxes] = useState(['', '', '']);
  const [avis, setAvis] = useState('');
  const [motifAvis, setMotifAvis] = useState('');
  const [commentairesAgent, setCommentairesAgent] = useState('');
  const [observations, setObservations] = useState('');

  const nomRef = useRef(null);
  const template = lien ? getTemplate(lien.template_key) : null;
  const brouillonCle = `cdl-brouillon-${token}`;

  /* --------------------------- Chargement --------------------------- */
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc('get_form_by_token', { p_token: token });
      if (error) {
        setErreur(error.message);
        setEtat('erreur');
        return;
      }
      const l = data?.[0];
      if (!l) return setEtat('introuvable');
      if (l.statut === 'soumis') return setEtat('deja-soumis');
      if (l.statut === 'expire') return setEtat('expire');
      if (l.statut === 'annule') return setEtat('introuvable');
      if (!getTemplate(l.template_key)) return setEtat('introuvable');

      setLien(l);
      setInfos((i) => ({ ...i, evaluateur_nom: l.evaluateur_nom || '' }));
      setEtat('pret');
      supabase.rpc('mark_link_opened', { p_token: token });
    })();
  }, [token]);

  /* ---------------------- Brouillon local --------------------------- */
  useEffect(() => {
    if (etat !== 'pret') return;
    try {
      const b = JSON.parse(localStorage.getItem(brouillonCle) || 'null');
      if (!b) return;
      setInfos((i) => ({ ...i, ...b.infos }));
      setCriteres(b.criteres || {});
      setReponses(b.reponses || {});
      setNotes(b.notes || {});
      setNotesCas(b.notesCas || {});
      setNoteCasPratique(b.noteCasPratique ?? '');
      setPointsForts(b.pointsForts || ['', '', '', '']);
      setAxes(b.axes || ['', '', '']);
      setAvis(b.avis || '');
      setMotifAvis(b.motifAvis || '');
      setCommentairesAgent(b.commentairesAgent || '');
      setObservations(b.observations || '');
      setBrouillonVu(true);
    } catch {
      /* brouillon illisible : formulaire vierge */
    }
  }, [etat, brouillonCle]);

  useEffect(() => {
    if (etat !== 'pret') return;
    const id = setTimeout(() => {
      localStorage.setItem(
        brouillonCle,
        JSON.stringify({
          infos, criteres, reponses, notes, notesCas, noteCasPratique,
          pointsForts, axes, avis, motifAvis, commentairesAgent, observations,
        }),
      );
      setEnregistre(true);
      setTimeout(() => setEnregistre(false), 1600);
    }, 800);
    return () => clearTimeout(id);
  }, [etat, brouillonCle, infos, criteres, reponses, notes, notesCas, noteCasPratique,
      pointsForts, axes, avis, motifAvis, commentairesAgent, observations]);

  /* ------------------------ Sommaire et suivi ----------------------- */
  const sommaire = useMemo(() => {
    if (!template) return [];
    const s = [{ id: 'identification', titre: 'Personne évaluée', faits: 0, total: 1 }];
    if (template.categorie === 'fin-contrat') {
      template.sections.forEach((sec) => {
        s.push({
          id: `sec-${sec.code}`,
          titre: `${sec.code}. ${sec.titre}`,
          faits: sec.criteres.filter((c) => criteres[c.id]).length,
          total: sec.criteres.length,
        });
      });
      s.push({ id: 'synthese', titre: 'Synthèse et avis', faits: avis ? 1 : 0, total: 1 });
    } else if (template.categorie === 'questionnaire') {
      s.push({
        id: 'questionnaire',
        titre: 'Questionnaire',
        faits: template.questions.filter((q) => reponses[q.id]?.trim()).length,
        total: template.questions.length,
      });
      s.push({
        id: 'cas-pratique',
        titre: 'Cas pratique',
        faits: template.casPratique.questions.filter((q) => reponses[q.id]?.trim()).length,
        total: template.casPratique.questions.length,
      });
      s.push({ id: 'synthese', titre: 'Observations', faits: observations.trim() ? 1 : 0, total: 1 });
    } else {
      template.themes.forEach((t, i) => {
        s.push({
          id: `theme-${i}`,
          titre: `${i + 1}. ${t.titre}`,
          faits: t.questions.filter((q) => reponses[q.id]?.trim()).length,
          total: t.questions.length,
        });
      });
      s.push({
        id: 'cas-pratiques',
        titre: 'Cas pratiques',
        faits: template.cas.filter((c) => reponses[c.id]?.trim()).length,
        total: template.cas.length,
      });
      s.push({ id: 'synthese', titre: 'Synthèse', faits: observations.trim() ? 1 : 0, total: 1 });
    }
    s[0].faits = infos.evalue_nom.trim() ? 1 : 0;
    return s;
  }, [template, criteres, reponses, avis, observations, infos.evalue_nom]);

  const progression = useMemo(() => {
    const total = sommaire.reduce((n, s) => n + s.total, 0);
    const faits = sommaire.reduce((n, s) => n + s.faits, 0);
    return total ? Math.round((faits / total) * 100) : 0;
  }, [sommaire]);

  const score = useMemo(() => {
    if (!template) return null;
    const { total, max } = calculerScore(template, { criteres, notes, notesCas, noteCasPratique });
    return { total, max, pct: pourcentage(total, max), appreciation: appreciationPour(template, total) };
  }, [template, criteres, notes, notesCas, noteCasPratique]);

  /* --------------------------- Validation --------------------------- */
  const verifier = () => {
    if (!infos.evalue_nom.trim()) {
      setErreur('Le nom de la personne évaluée est obligatoire.');
      setManquants(['evalue_nom']);
      nomRef.current?.scrollIntoView({ block: 'center' });
      nomRef.current?.focus();
      return false;
    }
    if (template.categorie === 'fin-contrat') {
      const vides = template.sections.flatMap((s) => s.criteres.filter((c) => !criteres[c.id]).map((c) => c.id));
      if (vides.length) {
        setManquants(vides);
        setErreur(
          `${vides.length} critère${vides.length > 1 ? 's' : ''} sur ${
            template.scoreMax / 5
          } reste${vides.length > 1 ? 'nt' : ''} à noter. ${
            vides.length > 1 ? 'Ils sont signalés' : 'Il est signalé'
          } en rouge dans la grille.`,
        );
        document.getElementById(`crit-${vides[0]}`)?.scrollIntoView({ block: 'center' });
        return false;
      }
      if (!avis) {
        setManquants(['avis']);
        setErreur("Indiquez un avis sur le renouvellement du contrat.");
        document.getElementById('synthese')?.scrollIntoView({ block: 'start' });
        return false;
      }
    }
    setManquants([]);
    setErreur('');
    return true;
  };

  const ouvrirConfirmation = () => {
    if (verifier()) setConfirmation(true);
  };

  const transmettre = async () => {
    const charge = {
      categorie: template.categorie,
      evalue_nom: infos.evalue_nom.trim(),
      evalue_matricule: infos.evalue_matricule,
      poste: template.poste,
      service: template.service,
      type_contrat: infos.type_contrat,
      date_debut: infos.date_debut,
      date_fin: infos.date_fin,
      evaluateur_nom: infos.evaluateur_nom,
      score_total: score.total,
      score_max: score.max,
      pourcentage: score.pct,
      appreciation: score.total > 0 ? score.appreciation : null,
      avis_renouvellement: avis || null,
      reponses: {
        criteres,
        reponses,
        notes,
        notesCas,
        noteCasPratique: noteCasPratique === '' ? null : Number(noteCasPratique),
        points_forts: pointsForts,
        axes_amelioration: axes,
        motif_avis: motifAvis,
        commentaires_agent: commentairesAgent,
        observations,
      },
    };

    setEnvoi(true);
    const { error } = await supabase.rpc('submit_evaluation', { p_token: token, p_payload: charge });
    setEnvoi(false);
    if (error) {
      setConfirmation(false);
      setErreur(error.message);
      return;
    }
    localStorage.removeItem(brouillonCle);
    setEtat('envoye');
  };

  /* --------------------------- États ------------------------------- */
  if (etat === 'chargement') return <Message titre="Ouverture du formulaire…">Un instant.</Message>;
  if (etat === 'introuvable')
    return (
      <Message titre="Lien invalide" ton="alerte">
        Ce lien n'existe pas ou a été annulé. Rapprochez-vous du service des Ressources Humaines pour
        en obtenir un nouveau.
      </Message>
    );
  if (etat === 'expire')
    return (
      <Message titre="Lien expiré" ton="alerte">
        La période de validité est dépassée. Le service RH peut vous en renvoyer un.
      </Message>
    );
  if (etat === 'deja-soumis')
    return (
      <Message titre="Évaluation déjà transmise" ton="succes">
        Ce formulaire a été rempli et envoyé. Un lien ne peut servir qu'une seule fois.
      </Message>
    );
  if (etat === 'erreur') return <Message titre="Formulaire indisponible" ton="alerte">{erreur}</Message>;
  if (etat === 'envoye')
    return (
      <Message titre="Évaluation transmise" ton="succes">
        Merci. Le service des Ressources Humaines a reçu vos réponses. Vous pouvez fermer cette page.
      </Message>
    );

  const ton = tonPour(score.appreciation);
  const estFinContrat = template.categorie === 'fin-contrat';

  return (
    <div className="min-h-screen pb-28">
      {/* En-tête */}
      <header className="border-b border-rule bg-white">
        <div className="brand-rule" />
        <div className="mx-auto max-w-5xl px-5 py-6">
          <Logo taille="md" />
          <p className="mt-5 font-serif text-xl leading-tight">{template.titre}</p>
          <p className="text-sm text-ink-soft">
            {template.poste} · {template.service}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-faint">
            <span>À remplir avant le {dateCourte(lien.expire_le)}</span>
            <span>Saisie conservée sur cet appareil jusqu'à la transmission</span>
            {estFinContrat && <span>{template.scoreMax / 5} critères à noter</span>}
          </div>
          {brouillonVu && (
            <p className="mt-3 rounded-lg bg-teal-50 px-3 py-2 text-xs text-teal-700">
              Une saisie en cours a été retrouvée sur cet appareil : vous reprenez où vous vous étiez
              arrêté.
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto flex max-w-5xl gap-8 px-5 py-8">
        {/* Sommaire latéral */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-8">
            <p className="mb-3 px-2.5 text-xs font-semibold uppercase tracking-wide text-ink-faint">
              Sommaire
            </p>
            <Sommaire sommaire={sommaire} onNaviguer={() => setSommaireOuvert(false)} />
          </div>
        </aside>

        <form onSubmit={(e) => e.preventDefault()} className="min-w-0 flex-1 space-y-6">
          {/* Identification */}
          <Section
            id="identification"
            titre="Personne évaluée"
            indication="Renseignez l'agent concerné par cette évaluation."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label" htmlFor="nom">
                  Nom et prénom <span className="text-alert-500">*</span>
                </label>
                <input
                  id="nom"
                  ref={nomRef}
                  required
                  className={`field ${manquants.includes('evalue_nom') ? 'field-error' : ''}`}
                  value={infos.evalue_nom}
                  onChange={(e) => setInfos({ ...infos, evalue_nom: e.target.value })}
                />
              </div>
              <div>
                <label className="label" htmlFor="matricule">
                  Matricule
                </label>
                <input
                  id="matricule"
                  className="field"
                  value={infos.evalue_matricule}
                  onChange={(e) => setInfos({ ...infos, evalue_matricule: e.target.value })}
                />
              </div>
              <div>
                <label className="label" htmlFor="contrat">
                  Type de contrat
                </label>
                <select
                  id="contrat"
                  className="field"
                  value={infos.type_contrat}
                  onChange={(e) => setInfos({ ...infos, type_contrat: e.target.value })}
                >
                  <option value="">—</option>
                  <option>CDD</option>
                  <option>CDI</option>
                  <option>Stage</option>
                  <option>Vacataire</option>
                </select>
              </div>
              <div>
                <label className="label" htmlFor="debut">
                  Date de début
                </label>
                <input
                  id="debut"
                  type="date"
                  className="field"
                  value={infos.date_debut}
                  onChange={(e) => setInfos({ ...infos, date_debut: e.target.value })}
                />
              </div>
              <div>
                <label className="label" htmlFor="fin">
                  Date de fin
                </label>
                <input
                  id="fin"
                  type="date"
                  className="field"
                  value={infos.date_fin}
                  onChange={(e) => setInfos({ ...infos, date_fin: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="evaluateur">
                  Évaluateur
                </label>
                <input
                  id="evaluateur"
                  className="field"
                  value={infos.evaluateur_nom}
                  onChange={(e) => setInfos({ ...infos, evaluateur_nom: e.target.value })}
                />
              </div>
            </div>
          </Section>

          {/* Missions */}
          {estFinContrat && (
            <details className="card p-6">
              <summary className="cursor-pointer font-serif text-lg">
                Missions confiées
                <span className="ml-2 text-sm font-sans font-normal text-ink-faint">
                  ({template.missions.length}) — pour rappel
                </span>
              </summary>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft">
                {template.missions.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </details>
          )}

          {/* Grille de critères */}
          {estFinContrat &&
            template.sections.map((s) => (
              <Section
                key={s.code}
                id={`sec-${s.code}`}
                titre={`${s.code}. ${s.titre}`}
                indication="1 insuffisant · 2 à améliorer · 3 satisfaisant · 4 bien · 5 excellent"
              >
                <ul className="divide-y divide-rule">
                  {s.criteres.map((c) => {
                    const manquant = manquants.includes(c.id);
                    return (
                      <li
                        key={c.id}
                        id={`crit-${c.id}`}
                        className={`flex flex-wrap items-center gap-x-6 gap-y-3 py-3.5 transition-colors ${
                          manquant ? 'rounded-lg bg-alert-50/50 px-2' : ''
                        }`}
                      >
                        <span className="flex-1 text-sm leading-snug">{c.label}</span>
                        <ChoixNote
                          nom={c.label}
                          manquant={manquant}
                          valeur={criteres[c.id]}
                          onChange={(v) => {
                            setCriteres({ ...criteres, [c.id]: v });
                            if (manquant) setManquants(manquants.filter((m) => m !== c.id));
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </Section>
            ))}

          {/* Questionnaire */}
          {template.categorie === 'questionnaire' && (
            <>
              <Section id="questionnaire" titre="Questionnaire" indication={template.instructions}>
                <ol className="space-y-7">
                  {template.questions.map((q) => (
                    <li key={q.id}>
                      <label className="label leading-snug" htmlFor={q.id}>
                        Q{q.num}. {q.texte}
                      </label>
                      <textarea
                        id={q.id}
                        rows={4}
                        className="field"
                        value={reponses[q.id] || ''}
                        onChange={(e) => setReponses({ ...reponses, [q.id]: e.target.value })}
                      />
                      <ChampNote
                        valeur={notes[q.id]}
                        bareme={q.bareme}
                        libelle="Note attribuée"
                        onChange={(v) => setNotes({ ...notes, [q.id]: v })}
                      />
                    </li>
                  ))}
                </ol>
              </Section>

              <Section id="cas-pratique" titre="Cas pratique">
                <div className="rounded-lg border border-rule bg-brand-soft px-4 py-3 text-sm leading-relaxed">
                  {template.casPratique.situation.map((s, i) => (
                    <p key={i} className={i ? 'mt-2' : ''}>
                      {s}
                    </p>
                  ))}
                </div>
                <ol className="mt-6 space-y-7">
                  {template.casPratique.questions.map((q) => (
                    <li key={q.id}>
                      <label className="label leading-snug" htmlFor={q.id}>
                        {q.num}. {q.texte}
                      </label>
                      <textarea
                        id={q.id}
                        rows={4}
                        className="field"
                        value={reponses[q.id] || ''}
                        onChange={(e) => setReponses({ ...reponses, [q.id]: e.target.value })}
                      />
                    </li>
                  ))}
                </ol>
                <ChampNote
                  valeur={noteCasPratique}
                  bareme={template.casPratique.bareme}
                  libelle="Note globale du cas pratique"
                  onChange={setNoteCasPratique}
                />
              </Section>
            </>
          )}

          {/* Grille d'entretien */}
          {template.categorie === 'entretien' && (
            <>
              {template.themes.map((t, i) => (
                <Section
                  key={t.titre}
                  id={`theme-${i}`}
                  titre={`${i + 1}. ${t.titre}`}
                  indication={i === 0 ? template.instructions : undefined}
                >
                  <ol className="space-y-7">
                    {t.questions.map((q) => (
                      <li key={q.id}>
                        <label className="label leading-snug" htmlFor={q.id}>
                          Q{q.num}. {q.texte}
                        </label>
                        <textarea
                          id={q.id}
                          rows={4}
                          className="field"
                          placeholder="Réponse de l'agent"
                          value={reponses[q.id] || ''}
                          onChange={(e) => setReponses({ ...reponses, [q.id]: e.target.value })}
                        />
                        <ChampNote
                          valeur={notes[q.id]}
                          bareme={q.bareme}
                          libelle="Note (facultative)"
                          onChange={(v) => setNotes({ ...notes, [q.id]: v })}
                        />
                      </li>
                    ))}
                  </ol>
                </Section>
              ))}

              <Section id="cas-pratiques" titre="Cas pratiques">
                <ol className="space-y-7">
                  {template.cas.map((c) => (
                    <li key={c.id}>
                      <p className="text-sm font-semibold">
                        Cas {c.num} — {c.titre}
                      </p>
                      <p className="mt-1.5 rounded-lg border border-rule bg-brand-soft px-3 py-2 text-sm leading-relaxed">
                        {c.enonce}
                      </p>
                      <textarea
                        rows={4}
                        className="field mt-2"
                        placeholder="Réponse de l'agent"
                        value={reponses[c.id] || ''}
                        onChange={(e) => setReponses({ ...reponses, [c.id]: e.target.value })}
                      />
                      <ChampNote
                        valeur={notesCas[c.id]}
                        bareme={c.bareme}
                        libelle="Note (facultative)"
                        onChange={(v) => setNotesCas({ ...notesCas, [c.id]: v })}
                      />
                    </li>
                  ))}
                </ol>
              </Section>
            </>
          )}

          {/* Synthèse */}
          {estFinContrat ? (
            <Section id="synthese" titre="Synthèse et avis">
              <div className="space-y-7">
                <div>
                  <p className="label">Points forts observés</p>
                  <div className="space-y-2">
                    {pointsForts.map((v, i) => (
                      <input
                        key={i}
                        className="field"
                        placeholder={`Point fort ${i + 1}`}
                        value={v}
                        onChange={(e) => {
                          const c = [...pointsForts];
                          c[i] = e.target.value;
                          setPointsForts(c);
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="label">Axes d'amélioration</p>
                  <div className="space-y-2">
                    {axes.map((v, i) => (
                      <input
                        key={i}
                        className="field"
                        placeholder={`Axe ${i + 1}`}
                        value={v}
                        onChange={(e) => {
                          const c = [...axes];
                          c[i] = e.target.value;
                          setAxes(c);
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="label">
                    Avis sur le renouvellement du contrat <span className="text-alert-500">*</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Renouvellement recommandé', 'Renouvellement sous réserve', 'Non renouvellement'].map(
                      (a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => {
                            setAvis(a);
                            setManquants(manquants.filter((m) => m !== 'avis'));
                          }}
                          className={`chip ${avis === a ? 'chip-active' : ''} ${
                            manquants.includes('avis') ? 'border-alert-500' : ''
                          }`}
                        >
                          {a}
                        </button>
                      ),
                    )}
                  </div>
                  <textarea
                    rows={3}
                    className="field mt-3"
                    placeholder="Motif ou commentaire"
                    value={motifAvis}
                    onChange={(e) => setMotifAvis(e.target.value)}
                  />
                </div>

                <div>
                  <p className="label">Commentaires de l'agent évalué</p>
                  <textarea
                    rows={4}
                    className="field"
                    value={commentairesAgent}
                    onChange={(e) => setCommentairesAgent(e.target.value)}
                  />
                </div>
              </div>
            </Section>
          ) : (
            <Section
              id="synthese"
              titre={
                template.categorie === 'entretien'
                  ? "Synthèse de l'entretien"
                  : "Observations de l'évaluateur"
              }
            >
              <textarea
                rows={5}
                className="field"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
              />
            </Section>
          )}

          <Erreur>{erreur}</Erreur>
        </form>
      </div>

      {/* Barre d'action */}
      <div className="no-print fixed inset-x-0 bottom-0 z-20 border-t border-rule bg-white/95 shadow-bar backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3">
          <button
            type="button"
            onClick={() => setSommaireOuvert((o) => !o)}
            className="btn-quiet lg:hidden"
            aria-expanded={sommaireOuvert}
          >
            Sommaire
          </button>

          <div className="min-w-[7rem]">
            <div className="font-serif text-xl leading-none tabular-nums">
              {score.total}
              <span className="text-sm text-ink-faint">/{score.max}</span>
            </div>
            <div className={`mt-1 text-xs font-medium ${ton.texte}`}>
              {score.total > 0 ? score.appreciation : 'Non noté'}
            </div>
          </div>

          <div className="min-w-[8rem] flex-1">
            <div className="mb-1 flex justify-between text-xs text-ink-faint">
              <span>{enregistre ? 'Saisie enregistrée' : 'Progression'}</span>
              <span className="tabular-nums">{progression}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-wash">
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-500"
                style={{ width: `${Math.min(100, progression)}%` }}
              />
            </div>
          </div>

          <button type="button" onClick={ouvrirConfirmation} className="btn-primary">
            Transmettre
          </button>
        </div>

        {sommaireOuvert && (
          <div className="animate-fade-in max-h-72 overflow-y-auto border-t border-rule bg-white px-3 py-3 lg:hidden">
            <Sommaire sommaire={sommaire} onNaviguer={() => setSommaireOuvert(false)} />
          </div>
        )}
      </div>

      {/* Confirmation avant envoi définitif */}
      {confirmation && (
        <div
          className="fixed inset-0 z-40 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="card animate-fade-in w-full max-w-md p-6">
            <h2 className="font-serif text-lg">Transmettre l'évaluation ?</h2>
            <p className="mt-2 text-sm text-ink-faint">
              Le lien ne pourra plus être réouvert : vérifiez ces éléments avant d'envoyer.
            </p>

            <dl className="mt-5 space-y-2 border-y border-rule py-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint">Personne évaluée</dt>
                <dd className="text-right font-medium">{infos.evalue_nom}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint">Évaluateur</dt>
                <dd className="text-right">{infos.evaluateur_nom || '—'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint">Score</dt>
                <dd className="text-right font-medium tabular-nums">
                  {score.total}/{score.max} ({score.pct}%)
                </dd>
              </div>
              {score.total > 0 && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-faint">Appréciation</dt>
                  <dd className={`text-right font-medium ${ton.texte}`}>{score.appreciation}</dd>
                </div>
              )}
              {avis && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-faint">Avis</dt>
                  <dd className="text-right">{avis}</dd>
                </div>
              )}
            </dl>

            <div className="mt-5 flex gap-2">
              <button onClick={() => setConfirmation(false)} className="btn-ghost flex-1">
                Revenir au formulaire
              </button>
              <button onClick={transmettre} className="btn-primary flex-1" disabled={envoi}>
                {envoi ? 'Transmission…' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
