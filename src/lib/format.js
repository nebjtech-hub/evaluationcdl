export const dateCourte = (d) =>
  d ? new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

export const dateLongue = (d) =>
  d
    ? new Date(d).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—';

export const dateHeure = (d) =>
  d
    ? new Date(d).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

export const moisCourt = (d) =>
  new Date(d).toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });

/** Numéro au format international sans « + » ni séparateur, pour wa.me. */
export function normaliserTelephone(tel) {
  const brut = (tel || '').replace(/[^\d+]/g, '');
  if (!brut) return '';
  if (brut.startsWith('+')) return brut.slice(1);
  // Numéro gabonais saisi en local (8 ou 9 chiffres) → préfixe 241
  if (brut.length <= 9) return `241${brut.replace(/^0+/, '')}`;
  return brut;
}

export function messageInvitation({ poste, titre, lien, evaluateurNom, echeance }) {
  const salutation = evaluateurNom ? `Bonjour ${evaluateurNom},` : 'Bonjour,';
  return (
    `${salutation}\n\n` +
    `Vous êtes sollicité(e) pour remplir une ${titre.toLowerCase()} — ${poste}.\n\n` +
    `Le formulaire est accessible ici :\n${lien}\n\n` +
    `Merci de renseigner le nom de la personne évaluée directement dans le formulaire. ` +
    `Le lien est personnel et reste valable jusqu'au ${echeance}.\n\n` +
    `Service des Ressources Humaines\nCentre Diagnostic de Libreville`
  );
}

export function lienWhatsApp(tel, message) {
  const num = normaliserTelephone(tel);
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function lienEmail(email, objet, message) {
  return `mailto:${email}?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(message)}`;
}
