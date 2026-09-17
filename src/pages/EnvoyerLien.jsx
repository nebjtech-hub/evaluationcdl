import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { APP_URL, supabase } from '../lib/supabase';
import { TEMPLATES, templatesByCategorie } from '../lib/templates';
import { dateCourte, lienEmail, lienWhatsApp, messageInvitation } from '../lib/format';
import { Erreur, Succes, TitrePage } from '../components/Ui';

export default function EnvoyerLien() {
  const [params] = useSearchParams();
  const [modele, setModele] = useState(params.get('modele') || TEMPLATES[0].key);
  const [evaluateurNom, setEvaluateurNom] = useState('');
  const [canal, setCanal] = useState('email');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [jours, setJours] = useState(30);
  const [note, setNote] = useState('');
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState('');
  const [resultat, setResultat] = useState(null);
  const [copie, setCopie] = useState(false);

  const template = useMemo(() => TEMPLATES.find((t) => t.key === modele), [modele]);

  const creer = async (e) => {
    e.preventDefault();
    setErreur('');
    setEnCours(true);

    const expire = new Date(Date.now() + Number(jours) * 86400000).toISOString();
    const { data, error } = await supabase
      .from('evaluation_links')
      .insert({
        template_key: modele,
        evaluateur_nom: evaluateurNom.trim() || null,
        destinataire_email: canal === 'email' ? email.trim() || null : null,
        destinataire_tel: canal === 'whatsapp' ? tel.trim() || null : null,
        canal,
        note_interne: note.trim() || null,
        expire_le: expire,
      })
      .select()
      .single();

    setEnCours(false);
    if (error) {
      setErreur(error.message);
      return;
    }
    setResultat(data);
  };

  const url = resultat ? `${APP_URL}/f/${resultat.token}` : '';
  const message = resultat
    ? messageInvitation({
        poste: template.poste,
        titre: template.titre,
        lien: url,
        evaluateurNom: resultat.evaluateur_nom,
        echeance: dateCourte(resultat.expire_le),
      })
    : '';
  const objet = resultat ? `${template.titre} — ${template.poste}` : '';

  const copier = async () => {
    await navigator.clipboard.writeText(url);
    setCopie(true);
    setTimeout(() => setCopie(false), 2000);
  };

  const recommencer = () => {
    setResultat(null);
    setEvaluateurNom('');
    setEmail('');
    setTel('');
    setNote('');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <TitrePage
        titre="Envoyer une évaluation"
        sousTitre="Le lien généré ouvre le formulaire pré-rempli avec le seul nom de l'évaluateur. C'est lui qui saisira le nom de la personne évaluée."
      />

      {!resultat ? (
        <form onSubmit={creer} className="card space-y-5 p-6">
          <div>
            <label className="label" htmlFor="modele">
              Formulaire à envoyer
            </label>
            <select
              id="modele"
              className="field"
              value={modele}
              onChange={(e) => setModele(e.target.value)}
            >
              {templatesByCategorie().map((g) => (
                <optgroup key={g.categorie} label={g.label}>
                  {g.templates.map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.poste}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-ink-faint">
              {template.service} · barème sur {template.scoreMax} points
            </p>
          </div>

          <div>
            <label className="label" htmlFor="evaluateur">
              Nom de l'évaluateur
            </label>
            <input
              id="evaluateur"
              className="field"
              placeholder="Ex. Dr NGUEMA Paul, responsable du service"
              value={evaluateurNom}
              onChange={(e) => setEvaluateurNom(e.target.value)}
            />
            <p className="mt-1.5 text-xs text-ink-faint">
              Seul champ pré-rempli dans le formulaire.
            </p>
          </div>

          <fieldset>
            <legend className="label">Mode d'envoi</legend>
            <div className="flex gap-2">
              {[
                ['email', 'Email'],
                ['whatsapp', 'WhatsApp'],
                ['lien', 'Lien à copier'],
              ].map(([val, lib]) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setCanal(val)}
                  className={`chip ${canal === val ? 'chip-active' : ''}`}
                >
                  {lib}
                </button>
              ))}
            </div>
          </fieldset>

          {canal === 'email' && (
            <div>
              <label className="label" htmlFor="dest-email">
                Adresse email de l'évaluateur
              </label>
              <input
                id="dest-email"
                type="email"
                className="field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          {canal === 'whatsapp' && (
            <div>
              <label className="label" htmlFor="dest-tel">
                Numéro WhatsApp
              </label>
              <input
                id="dest-tel"
                className="field"
                placeholder="06 00 00 00 ou +241 06 00 00 00"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
              <p className="mt-1.5 text-xs text-ink-faint">
                Un numéro sans indicatif est complété avec +241.
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="jours">
                Validité du lien
              </label>
              <select id="jours" className="field" value={jours} onChange={(e) => setJours(e.target.value)}>
                <option value={7}>7 jours</option>
                <option value={15}>15 jours</option>
                <option value={30}>30 jours</option>
                <option value={90}>90 jours</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="note">
                Note interne
              </label>
              <input
                id="note"
                className="field"
                placeholder="Facultatif"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          <Erreur>{erreur}</Erreur>

          <button type="submit" className="btn-primary" disabled={enCours}>
            {enCours ? 'Création…' : 'Créer le lien'}
          </button>
        </form>
      ) : (
        <div className="card space-y-5 p-6">
          <Succes>
            Lien créé pour « {template.poste} », valable jusqu'au {dateCourte(resultat.expire_le)}.
          </Succes>

          <div className="flex items-center gap-2">
            <input readOnly className="field font-mono text-xs" value={url} />
            <button onClick={copier} className="btn-ghost shrink-0">
              {copie ? 'Copié' : 'Copier'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {resultat.destinataire_email && (
              <a
                className="btn-primary"
                href={lienEmail(resultat.destinataire_email, objet, message)}
              >
                Ouvrir dans la messagerie
              </a>
            )}
            {resultat.destinataire_tel && (
              <a
                className="btn-primary"
                target="_blank"
                rel="noreferrer"
                href={lienWhatsApp(resultat.destinataire_tel, message)}
              >
                Envoyer sur WhatsApp
              </a>
            )}
            <Link to="/liens" className="btn-ghost">
              Voir tous les liens
            </Link>
            <button onClick={recommencer} className="btn-ghost">
              Créer un autre lien
            </button>
          </div>

          <div>
            <p className="label">Message pré-rédigé</p>
            <textarea readOnly rows={9} className="field font-mono text-xs" value={message} />
          </div>
        </div>
      )}
    </div>
  );
}
