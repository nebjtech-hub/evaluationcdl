import { Fragment } from 'react';
import { dateCourte, dateLongue } from '../lib/format';
import Logo from './Logo';
import { moyennesParSection } from '../lib/scoring';

const Ligne = ({ libelle, valeur }) => (
  <div className="flex gap-2 border-b border-rule py-1.5">
    <span className="w-40 shrink-0 text-xs font-semibold uppercase tracking-wide text-ink-faint">
      {libelle}
    </span>
    <span className="text-sm">{valeur || '—'}</span>
  </div>
);

const TitreSection = ({ numero, children }) => (
  <h2 className="mb-3 mt-8 border-b-2 border-ink pb-1 font-serif text-base font-semibold">
    {numero}. {children}
  </h2>
);

const Bloc = ({ titre, texte }) => (
  <div className="print-avoid-break mb-4">
    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-faint">{titre}</p>
    <p className="whitespace-pre-wrap border border-rule bg-white px-3 py-2 text-sm leading-relaxed">
      {texte?.trim() ? texte : '—'}
    </p>
  </div>
);

/**
 * Rend une évaluation complète, à l'écran comme à l'impression.
 * `evaluation` est la ligne de la table `evaluations`.
 */
export default function FicheImprimable({ template, evaluation }) {
  const r = evaluation.reponses || {};

  return (
    <article className="printable mx-auto max-w-4xl rounded-xl border border-rule bg-white p-8 font-serif text-ink shadow-card print:rounded-none print:border-0 print:shadow-none">
      {/* -------------------- En-tête -------------------- */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink pb-4">
        <Logo taille="lg" print />
        <div className="text-right">
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            Service des Ressources Humaines
          </p>
          <p className="mt-1 font-sans text-sm font-semibold uppercase tracking-wide">
            {template.titre}
          </p>
          <p className="font-sans text-sm text-ink-soft">{template.poste}</p>
        </div>
      </header>

      {/* -------------------- I. Informations -------------------- */}
      <TitreSection numero="I">Informations générales</TitreSection>
      <div className="grid gap-x-8 sm:grid-cols-2">
        <Ligne libelle="Nom & prénom" valeur={evaluation.evalue_nom} />
        <Ligne libelle="Matricule" valeur={evaluation.evalue_matricule} />
        <Ligne libelle="Poste occupé" valeur={evaluation.poste || template.poste} />
        <Ligne libelle="Service" valeur={evaluation.service || template.service} />
        <Ligne libelle="Date de début" valeur={dateCourte(evaluation.date_debut)} />
        <Ligne libelle="Date de fin" valeur={dateCourte(evaluation.date_fin)} />
        <Ligne libelle="Type de contrat" valeur={evaluation.type_contrat} />
        <Ligne libelle="Évaluateur" valeur={evaluation.evaluateur_nom} />
      </div>

      {/* ============ GRILLE DE FIN DE CONTRAT ============ */}
      {template.categorie === 'fin-contrat' && (
        <>
          <TitreSection numero="II">Rappel des missions confiées</TitreSection>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
            {template.missions.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>

          <TitreSection numero="III">Grille d'évaluation par critères</TitreSection>
          <p className="mb-2 font-sans text-xs italic text-ink-faint">
            Notation : 1 = Insuffisant · 2 = À améliorer · 3 = Satisfaisant · 4 = Bien · 5 = Excellent
          </p>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-y-2 border-ink font-sans text-xs uppercase tracking-wide">
                <th className="py-2 text-left font-semibold">Critère d'évaluation</th>
                <th className="w-20 py-2 text-right font-semibold">Note</th>
              </tr>
            </thead>
            <tbody>
              {template.sections.map((s) => (
                <Fragment key={s.code}>
                  <tr className="bg-rule/40">
                    <td colSpan={2} className="border-b border-rule px-1 py-1.5 font-sans text-xs font-bold uppercase tracking-wide">
                      {s.code}. {s.titre}
                    </td>
                  </tr>
                  {s.criteres.map((c) => (
                    <tr key={c.id}>
                      <td className="border-b border-rule py-1.5 pr-3 leading-snug">{c.label}</td>
                      <td className="border-b border-rule py-1.5 text-right font-sans tabular-nums">
                        {r.criteres?.[c.id] ? `${r.criteres[c.id]} / 5` : '—'}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
              <tr className="border-y-2 border-ink font-sans font-bold">
                <td className="py-2 uppercase tracking-wide">Total général</td>
                <td className="py-2 text-right tabular-nums">
                  {evaluation.score_total} / {evaluation.score_max}
                </td>
              </tr>
            </tbody>
          </table>

          <TitreSection numero="IV">Appréciation globale</TitreSection>
          <div className="flex flex-wrap gap-4 font-sans text-sm">
            {template.paliers.map((p) => (
              <span key={p.label} className="flex items-center gap-1.5">
                <span
                  className={`inline-block h-3.5 w-3.5 border border-ink ${
                    evaluation.appreciation === p.label ? 'bg-ink' : 'bg-white'
                  }`}
                />
                {p.label} ({p.min} – {p.max})
              </span>
            ))}
          </div>

          <TitreSection numero="V">Points forts observés</TitreSection>
          <ol className="list-decimal space-y-1 pl-5 text-sm">
            {(r.points_forts?.filter(Boolean).length ? r.points_forts.filter(Boolean) : ['—']).map(
              (p, i) => (
                <li key={i}>{p}</li>
              ),
            )}
          </ol>

          <TitreSection numero="VI">Axes d'amélioration</TitreSection>
          <ol className="list-decimal space-y-1 pl-5 text-sm">
            {(r.axes_amelioration?.filter(Boolean).length
              ? r.axes_amelioration.filter(Boolean)
              : ['—']
            ).map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>

          <TitreSection numero="VII">Avis sur le renouvellement du contrat</TitreSection>
          <div className="flex flex-wrap gap-4 font-sans text-sm">
            {['Renouvellement recommandé', 'Renouvellement sous réserve', 'Non renouvellement'].map(
              (a) => (
                <span key={a} className="flex items-center gap-1.5">
                  <span
                    className={`inline-block h-3.5 w-3.5 border border-ink ${
                      evaluation.avis_renouvellement === a ? 'bg-ink' : 'bg-white'
                    }`}
                  />
                  {a}
                </span>
              ),
            )}
          </div>
          <div className="mt-3">
            <Bloc titre="Motif / commentaire" texte={r.motif_avis} />
          </div>

          <TitreSection numero="VIII">Commentaires de l'agent évalué</TitreSection>
          <Bloc titre="" texte={r.commentaires_agent} />
        </>
      )}

      {/* ============ QUESTIONNAIRE MÉTIER ============ */}
      {template.categorie === 'questionnaire' && (
        <>
          <TitreSection numero="II">Questionnaire</TitreSection>
          <ol className="space-y-4">
            {template.questions.map((q) => (
              <li key={q.id} className="print-avoid-break">
                <p className="text-sm font-semibold">
                  Q{q.num}. {q.texte}
                </p>
                <p className="mt-1 whitespace-pre-wrap border-l-2 border-rule pl-3 text-sm leading-relaxed">
                  {r.reponses?.[q.id]?.trim() || '—'}
                </p>
                <p className="mt-1 font-sans text-xs text-ink-faint">
                  Note : {r.notes?.[q.id] ?? '—'} / {q.bareme}
                </p>
              </li>
            ))}
          </ol>

          <TitreSection numero="III">Cas pratique</TitreSection>
          <div className="mb-4 border border-rule bg-rule/20 px-3 py-2 text-sm leading-relaxed">
            {template.casPratique.situation.map((s, i) => (
              <p key={i} className={i ? 'mt-1' : ''}>
                {s}
              </p>
            ))}
          </div>
          <ol className="space-y-4">
            {template.casPratique.questions.map((q) => (
              <li key={q.id} className="print-avoid-break">
                <p className="text-sm font-semibold">
                  {q.num}. {q.texte}
                </p>
                <p className="mt-1 whitespace-pre-wrap border-l-2 border-rule pl-3 text-sm leading-relaxed">
                  {r.reponses?.[q.id]?.trim() || '—'}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-3 font-sans text-sm font-semibold">
            Note du cas pratique : {r.noteCasPratique ?? '—'} / {template.casPratique.bareme}
          </p>

          <TitreSection numero="IV">Résultat</TitreSection>
          <p className="font-sans text-sm">
            Total : <strong>{evaluation.score_total} / {evaluation.score_max}</strong> ({evaluation.pourcentage}%)
            — appréciation : <strong>{evaluation.appreciation}</strong>
          </p>
          <div className="mt-3">
            <Bloc titre="Observations de l'évaluateur" texte={r.observations} />
          </div>
        </>
      )}

      {/* ============ GRILLE D'ENTRETIEN ============ */}
      {template.categorie === 'entretien' && (
        <>
          <TitreSection numero="II">Questions et réponses de l'agent</TitreSection>
          {template.themes.map((t, i) => (
            <section key={t.titre} className="mb-5">
              <h3 className="mb-2 font-sans text-xs font-bold uppercase tracking-wide text-ink-soft">
                {i + 1}. {t.titre}
              </h3>
              <ol className="space-y-3">
                {t.questions.map((q) => (
                  <li key={q.id} className="print-avoid-break">
                    <p className="text-sm font-semibold">
                      Q{q.num}. {q.texte}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap border-l-2 border-rule pl-3 text-sm leading-relaxed">
                      {r.reponses?.[q.id]?.trim() || '—'}
                    </p>
                    {r.notes?.[q.id] != null && r.notes[q.id] !== '' && (
                      <p className="mt-1 font-sans text-xs text-ink-faint">
                        Note : {r.notes[q.id]} / {q.bareme}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          ))}

          <TitreSection numero="III">Cas pratiques</TitreSection>
          <ol className="space-y-4">
            {template.cas.map((c) => (
              <li key={c.id} className="print-avoid-break">
                <p className="text-sm font-semibold">
                  Cas {c.num} — {c.titre}
                </p>
                <p className="mt-1 text-sm italic leading-relaxed text-ink-soft">{c.enonce}</p>
                <p className="mt-1 whitespace-pre-wrap border-l-2 border-rule pl-3 text-sm leading-relaxed">
                  {r.reponses?.[c.id]?.trim() || '—'}
                </p>
                {r.notesCas?.[c.id] != null && r.notesCas[c.id] !== '' && (
                  <p className="mt-1 font-sans text-xs text-ink-faint">
                    Note : {r.notesCas[c.id]} / {c.bareme}
                  </p>
                )}
              </li>
            ))}
          </ol>

          {evaluation.score_total > 0 && (
            <>
              <TitreSection numero="IV">Résultat</TitreSection>
              <p className="font-sans text-sm">
                Total : <strong>{evaluation.score_total} / {evaluation.score_max}</strong> (
                {evaluation.pourcentage}%) — appréciation : <strong>{evaluation.appreciation}</strong>
              </p>
            </>
          )}
          <div className="mt-3">
            <Bloc titre="Synthèse de l'entretien" texte={r.observations} />
          </div>
        </>
      )}

      {/* -------------------- Synthèse par section -------------------- */}
      {template.categorie === 'fin-contrat' && (
        <div className="print-avoid-break mt-8">
          <h2 className="mb-3 border-b border-rule pb-1 font-sans text-xs font-bold uppercase tracking-wide text-ink-faint">
            Moyennes par domaine (sur 5)
          </h2>
          <ul className="grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
            {moyennesParSection(template, r.criteres).map((s) => (
              <li key={s.code} className="flex justify-between gap-3 border-b border-rule py-1">
                <span className="truncate">
                  {s.code}. {s.titre}
                </span>
                <span className="shrink-0 font-sans tabular-nums">
                  {s.moyenne != null ? s.moyenne.toFixed(1) : '—'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* -------------------- Signatures -------------------- */}
      <div className="print-avoid-break mt-10">
        <h2 className="mb-4 border-b border-rule pb-1 font-sans text-xs font-bold uppercase tracking-wide text-ink-faint">
          Signatures
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {template.signatures.map((s) => (
            <div key={s} className="text-center">
              <p className="text-xs font-semibold">{s}</p>
              <div className="mt-10 border-t border-ink pt-1 font-sans text-[11px] text-ink-faint">
                Lu et approuvé — date
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-10 border-t border-rule pt-2 text-center font-sans text-[11px] text-ink-faint">
        Document confidentiel — Centre Diagnostic de Libreville — Service RH ·
        Évaluation transmise le {dateLongue(evaluation.soumis_le)}
      </footer>
    </article>
  );
}
