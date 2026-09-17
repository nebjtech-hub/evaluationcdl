import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getTemplate } from '../lib/templates';
import { dateCourte } from '../lib/format';
import { BadgeAppreciation, BadgeStatut, Chargement, Erreur, Stat, TitrePage, Vide } from '../components/Ui';

export default function ListeEvaluations() {
  const { cle } = useParams();
  const template = getTemplate(cle);
  const [evaluations, setEvaluations] = useState([]);
  const [liens, setLiens] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    if (!template) return;
    setChargement(true);
    (async () => {
      const [e, l] = await Promise.all([
        supabase
          .from('evaluations')
          .select('id, evalue_nom, evaluateur_nom, score_total, score_max, pourcentage, appreciation, avis_renouvellement, soumis_le')
          .eq('template_key', cle)
          .order('soumis_le', { ascending: false }),
        supabase
          .from('evaluation_links')
          .select('id, statut, destinataire_email, destinataire_tel, evaluateur_nom, cree_le, expire_le')
          .eq('template_key', cle)
          .in('statut', ['envoye', 'ouvert'])
          .order('cree_le', { ascending: false }),
      ]);
      if (e.error || l.error) setErreur((e.error || l.error).message);
      setEvaluations(e.data || []);
      setLiens(l.data || []);
      setChargement(false);
    })();
  }, [cle, template]);

  const filtrees = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    if (!q) return evaluations;
    return evaluations.filter(
      (e) =>
        e.evalue_nom?.toLowerCase().includes(q) || e.evaluateur_nom?.toLowerCase().includes(q),
    );
  }, [evaluations, recherche]);

  const moyenne = useMemo(() => {
    const avec = evaluations.filter((e) => e.pourcentage != null);
    if (!avec.length) return null;
    return Math.round((avec.reduce((t, e) => t + Number(e.pourcentage), 0) / avec.length) * 10) / 10;
  }, [evaluations]);

  if (!template) {
    return <Vide titre="Modèle inconnu">Cette adresse ne correspond à aucun formulaire.</Vide>;
  }
  if (chargement) return <Chargement />;

  return (
    <div className="space-y-8">
      <TitrePage
        titre={template.poste}
        sousTitre={`${template.titre} · ${template.service} · barème sur ${template.scoreMax} points`}
        retour={
          <Link to="/" className="text-sm text-ink-faint transition-colors hover:text-teal-700">
            ← Tableau de bord
          </Link>
        }
      >
        <Link to={`/envoyer?modele=${template.key}`} className="btn-primary">
          Envoyer ce formulaire
        </Link>
      </TitrePage>

      <Erreur>{erreur}</Erreur>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat valeur={evaluations.length} libelle="Évaluations reçues" />
        <Stat
          valeur={moyenne != null ? `${moyenne} %` : '—'}
          libelle="Score moyen"
          accent="text-teal-700"
        />
        <Stat valeur={liens.length} libelle="En attente de réponse" accent={liens.length ? 'text-warn-600' : 'text-ink'} />
      </div>

      {liens.length > 0 && (
        <section className="card p-5">
          <h2 className="mb-3 text-sm font-semibold text-ink-soft">Liens en attente</h2>
          <ul className="divide-y divide-rule text-sm">
            {liens.map((l) => (
              <li key={l.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2">
                <span className="font-medium">{l.evaluateur_nom || 'Évaluateur non renseigné'}</span>
                <span className="text-ink-faint">{l.destinataire_email || l.destinataire_tel || '—'}</span>
                <span className="ml-auto flex items-center gap-3 text-xs text-ink-faint">
                  envoyé le {dateCourte(l.cree_le)} · expire le {dateCourte(l.expire_le)}
                  <BadgeStatut statut={l.statut} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="font-serif text-lg">Évaluations reçues</h2>
          <input
            className="field max-w-xs"
            placeholder="Rechercher un nom"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>

        {filtrees.length === 0 ? (
          <Vide titre="Aucune évaluation pour ce poste">
            Envoyez le formulaire à un évaluateur : sa réponse apparaîtra ici dès qu'il l'aura transmise.
          </Vide>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-rule bg-rule/20 text-left text-xs uppercase tracking-wide text-ink-faint">
                <tr>
                  <th className="px-4 py-3 font-medium">Personne évaluée</th>
                  <th className="px-4 py-3 font-medium">Évaluateur</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Appréciation</th>
                  <th className="px-4 py-3 font-medium">Reçue le</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {filtrees.map((e) => (
                  <tr key={e.id} className="hover:bg-rule/20">
                    <td className="px-4 py-3 font-medium">{e.evalue_nom}</td>
                    <td className="px-4 py-3 text-ink-soft">{e.evaluateur_nom || '—'}</td>
                    <td className="px-4 py-3 tabular-nums">
                      {e.score_total != null ? (
                        <>
                          {e.score_total}/{e.score_max}
                          <span className="ml-1 text-ink-faint">({e.pourcentage}%)</span>
                        </>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <BadgeAppreciation appreciation={e.appreciation} />
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{dateCourte(e.soumis_le)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link to={`/evaluations/${e.id}`} className="text-teal-600 hover:underline">
                        Voir le détail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
