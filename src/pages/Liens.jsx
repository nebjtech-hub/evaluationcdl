import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_URL, supabase } from '../lib/supabase';
import { getTemplate } from '../lib/templates';
import { dateCourte, lienEmail, lienWhatsApp, messageInvitation } from '../lib/format';
import { BadgeStatut, Chargement, Erreur, TitrePage, Vide } from '../components/Ui';

const FILTRES = [
  ['tous', 'Tous'],
  ['envoye', 'Envoyés'],
  ['ouvert', 'Ouverts'],
  ['soumis', 'Reçus'],
  ['expire', 'Expirés'],
];

export default function Liens() {
  const [liens, setLiens] = useState([]);
  const [filtre, setFiltre] = useState('tous');
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [copie, setCopie] = useState(null);

  const charger = async () => {
    const { data, error } = await supabase
      .from('evaluation_links')
      .select('*')
      .order('cree_le', { ascending: false });
    if (error) setErreur(error.message);
    setLiens(data || []);
    setChargement(false);
  };

  useEffect(() => {
    charger();
  }, []);

  const avecStatut = useMemo(
    () =>
      liens.map((l) => ({
        ...l,
        statutEffectif:
          l.statut !== 'soumis' && l.statut !== 'annule' && new Date(l.expire_le) < new Date()
            ? 'expire'
            : l.statut,
      })),
    [liens],
  );

  const affiches = avecStatut.filter((l) => filtre === 'tous' || l.statutEffectif === filtre);

  const annuler = async (id) => {
    const { error } = await supabase.from('evaluation_links').update({ statut: 'annule' }).eq('id', id);
    if (error) setErreur(error.message);
    else charger();
  };

  const copier = async (token) => {
    await navigator.clipboard.writeText(`${APP_URL}/f/${token}`);
    setCopie(token);
    setTimeout(() => setCopie(null), 2000);
  };

  if (chargement) return <Chargement />;

  return (
    <div className="space-y-6">
      <TitrePage
        titre="Liens envoyés"
        sousTitre="Suivi de chaque formulaire transmis, de l'envoi à la réception."
      >
        <Link to="/envoyer" className="btn-primary">
          Nouvel envoi
        </Link>
      </TitrePage>

      <Erreur>{erreur}</Erreur>

      <div className="flex flex-wrap gap-2">
        {FILTRES.map(([val, lib]) => {
          const n = val === 'tous' ? avecStatut.length : avecStatut.filter((l) => l.statutEffectif === val).length;
          return (
            <button
              key={val}
              onClick={() => setFiltre(val)}
              className={`chip ${filtre === val ? 'chip-active' : ''}`}
            >
              {lib} <span className="tabular-nums text-ink-faint">{n}</span>
            </button>
          );
        })}
      </div>

      {affiches.length === 0 ? (
        <Vide titre="Aucun lien dans cette catégorie" />
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-rule bg-rule/20 text-left text-xs uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="px-4 py-3 font-medium">Formulaire</th>
                <th className="px-4 py-3 font-medium">Évaluateur</th>
                <th className="px-4 py-3 font-medium">Destinataire</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Échéance</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {affiches.map((l) => {
                const t = getTemplate(l.template_key);
                const url = `${APP_URL}/f/${l.token}`;
                const message = t
                  ? messageInvitation({
                      poste: t.poste,
                      titre: t.titre,
                      lien: url,
                      evaluateurNom: l.evaluateur_nom,
                      echeance: dateCourte(l.expire_le),
                    })
                  : url;
                return (
                  <tr key={l.id} className="hover:bg-rule/20">
                    <td className="px-4 py-3">
                      <div className="font-medium">{t?.poste || l.template_key}</div>
                      <div className="text-xs text-ink-faint">{t?.titre}</div>
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{l.evaluateur_nom || '—'}</td>
                    <td className="px-4 py-3 text-ink-soft">
                      {l.destinataire_email || l.destinataire_tel || 'Lien copié'}
                    </td>
                    <td className="px-4 py-3">
                      <BadgeStatut statut={l.statutEffectif} />
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{dateCourte(l.expire_le)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-3 text-xs">
                        <button onClick={() => copier(l.token)} className="text-teal-600 hover:underline">
                          {copie === l.token ? 'Copié' : 'Copier'}
                        </button>
                        {l.destinataire_tel && (
                          <a
                            href={lienWhatsApp(l.destinataire_tel, message)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-teal-600 hover:underline"
                          >
                            Relancer
                          </a>
                        )}
                        {l.destinataire_email && (
                          <a
                            href={lienEmail(l.destinataire_email, t?.titre || 'Évaluation', message)}
                            className="text-teal-600 hover:underline"
                          >
                            Relancer
                          </a>
                        )}
                        {l.statutEffectif !== 'soumis' && l.statut !== 'annule' && (
                          <button onClick={() => annuler(l.id)} className="text-alert-600 hover:underline">
                            Annuler
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
