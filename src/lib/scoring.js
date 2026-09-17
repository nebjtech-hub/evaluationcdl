// Calcul des scores. Une seule règle par catégorie de modèle, appliquée
// aussi bien dans le formulaire public que dans le tableau de bord.

/** Somme des notes d'un objet {id: note}, en ignorant les cases vides. */
const somme = (obj = {}) =>
  Object.values(obj).reduce((t, v) => t + (Number.isFinite(Number(v)) ? Number(v) : 0), 0);

/** Nombre de réponses effectivement saisies. */
export const nbRenseignes = (obj = {}) =>
  Object.values(obj).filter((v) => v !== '' && v !== null && v !== undefined).length;

export function calculerScore(template, reponses) {
  if (template.categorie === 'fin-contrat') {
    return { total: somme(reponses.criteres), max: template.scoreMax };
  }
  if (template.categorie === 'questionnaire') {
    return {
      total: somme(reponses.notes) + (Number(reponses.noteCasPratique) || 0),
      max: template.scoreMax,
    };
  }
  // Grille d'entretien : notation facultative
  const total = somme(reponses.notes) + somme(reponses.notesCas);
  return { total, max: template.scoreMax };
}

export function appreciationPour(template, total) {
  const palier = template.paliers.find((p) => total >= p.min && total <= p.max);
  return palier ? palier.label : template.paliers[0].label;
}

export const pourcentage = (total, max) => (max > 0 ? Math.round((total / max) * 1000) / 10 : 0);

/** Couleur associée à une appréciation, partagée par tous les écrans. */
export const TON_APPRECIATION = {
  Insuffisant: { texte: 'text-alert-600', fond: 'bg-alert-50', barre: 'bg-alert-500' },
  Satisfaisant: { texte: 'text-warn-600', fond: 'bg-warn-50', barre: 'bg-warn-500' },
  Bien: { texte: 'text-teal-600', fond: 'bg-teal-50', barre: 'bg-teal-500' },
  Excellent: { texte: 'text-teal-700', fond: 'bg-teal-100', barre: 'bg-teal-700' },
};

export const tonPour = (appreciation) =>
  TON_APPRECIATION[appreciation] || { texte: 'text-ink-soft', fond: 'bg-rule/40', barre: 'bg-ink-faint' };

/**
 * Moyenne par section d'une grille de fin de contrat, sur 5.
 * Sert à repérer les points forts et les points faibles collectifs.
 */
export function moyennesParSection(template, criteres = {}) {
  if (template.categorie !== 'fin-contrat') return [];
  return template.sections.map((s) => {
    const notes = s.criteres.map((c) => Number(criteres[c.id])).filter((n) => n > 0);
    const moyenne = notes.length ? notes.reduce((a, b) => a + b, 0) / notes.length : null;
    return { code: s.code, titre: s.titre, moyenne, nbNotes: notes.length, nbCriteres: s.criteres.length };
  });
}
