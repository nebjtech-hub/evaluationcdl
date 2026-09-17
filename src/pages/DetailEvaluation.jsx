import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getTemplate } from '../lib/templates';
import { moyennesParSection, tonPour } from '../lib/scoring';
import { dateHeure } from '../lib/format';
import FicheImprimable from '../components/FicheImprimable';
import { BadgeAppreciation, Chargement, Erreur, TitrePage, Vide } from '../components/Ui';

export default function DetailEvaluation() {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('evaluations').select('*').eq('id', id).single();
      if (error) setErreur(error.message);
      setEvaluation(data);
      setChargement(false);
    })();
  }, [id]);

  if (chargement) return <Chargement />;
  if (erreur) return <Erreur>{erreur}</Erreur>;
  if (!evaluation) return <Vide titre="Évaluation introuvable" />;

  const template = getTemplate(evaluation.template_key);
  if (!template) return <Vide titre="Le modèle de cette évaluation n'existe plus" />;

  const ton = tonPour(evaluation.appreciation);
  const sections = moyennesParSection(template, evaluation.reponses?.criteres);
  const triees = [...sections].filter((s) => s.moyenne != null).sort((a, b) => b.moyenne - a.moyenne);

  return (
    <div className="space-y-6">
      <div className="no-print">
        <TitrePage
          titre={evaluation.evalue_nom}
          sousTitre={`${template.titre} · évaluée par ${
            evaluation.evaluateur_nom || 'non renseigné'
          } · reçue le ${dateHeure(evaluation.soumis_le)}`}
          retour={
            <Link
              to={`/modeles/${template.key}`}
              className="text-sm text-ink-faint transition-colors hover:text-teal-700"
            >
              ← {template.poste}
            </Link>
          }
        >
          <button onClick={() => window.print()} className="btn-primary">
            Imprimer / enregistrer en PDF
          </button>
        </TitrePage>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className={`card p-5 ${ton.fond}`}>
            <div className={`font-serif text-3xl tabular-nums ${ton.texte}`}>
              {evaluation.score_total ?? '—'}
              <span className="text-lg text-ink-faint">/{evaluation.score_max}</span>
            </div>
            <div className="mt-1 text-sm font-medium text-ink-soft">
              Score global · {evaluation.pourcentage ?? '—'} %
            </div>
            <div className="mt-2">
              <BadgeAppreciation appreciation={evaluation.appreciation} />
            </div>
          </div>

          {triees.length > 0 && (
            <>
              <div className="card p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  Domaine le plus solide
                </p>
                <p className="mt-2 font-serif text-base leading-snug">{triees[0].titre}</p>
                <p className="mt-1 text-sm text-teal-700">{triees[0].moyenne.toFixed(1)} / 5 de moyenne</p>
              </div>
              <div className="card p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  Domaine à renforcer
                </p>
                <p className="mt-2 font-serif text-base leading-snug">
                  {triees[triees.length - 1].titre}
                </p>
                <p className="mt-1 text-sm text-warn-600">
                  {triees[triees.length - 1].moyenne.toFixed(1)} / 5 de moyenne
                </p>
              </div>
            </>
          )}

          {evaluation.avis_renouvellement && triees.length === 0 && (
            <div className="card p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Avis</p>
              <p className="mt-2 font-serif text-base">{evaluation.avis_renouvellement}</p>
            </div>
          )}
        </div>
      </div>

      <FicheImprimable template={template} evaluation={evaluation} />
    </div>
  );
}
