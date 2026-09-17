# Évaluations RH — Centre Diagnostic de Libreville

Application de gestion des évaluations du personnel. Le service RH envoie un lien
à un évaluateur (par email ou WhatsApp), celui-ci remplit le formulaire en ligne,
et la réponse remonte dans un tableau de bord avec impression PDF.

Les 12 formulaires Word du CDL ont été convertis en modèles exploitables.

---

## 1. Prérequis

- Node.js 18 ou plus
- Un projet Supabase (celui-ci utilise `xflgpihdvnielnndnktk.supabase.co`)

## 2. Installation

```bash
npm install
cp .env.example .env     # puis vérifier les valeurs
```

Le fichier `.env` :

```
VITE_SUPABASE_URL=https://xflgpihdvnielnndnktk.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
VITE_APP_URL=http://localhost:5173
```

`VITE_APP_URL` sert à construire les liens envoyés aux évaluateurs. En production,
mettre l'URL réelle du site (`https://evaluations.centrediagnostic.ga` par exemple),
sinon les liens envoyés pointeront vers localhost.

## 3. Base de données

Ouvrir Supabase → **SQL Editor** → coller le contenu de `supabase/schema.sql` → exécuter.
Le script est idempotent : il peut être relancé sans casser les données existantes.

Il crée :

- `evaluation_links` — un lien envoyé = une ligne (jeton, modèle, évaluateur, statut, expiration)
- `evaluations` — les réponses reçues (scores calculés + `reponses` en JSONB)
- les policies RLS
- trois fonctions `security definer` pour l'accès public par jeton
- la vue `v_kpi_par_modele`

## 4. Créer un compte administrateur

Supabase → **Authentication → Users → Add user** → email + mot de passe,
en cochant « Auto Confirm User ». Il n'y a pas d'inscription depuis l'application :
les comptes RH sont créés à la main.

Pour éviter que quelqu'un s'inscrive de lui-même :
**Authentication → Providers → Email** → désactiver « Enable signup ».

## 5. Lancer

```bash
npm run dev      # http://localhost:5173
npm run build    # génère dist/
```

---

## Sécurité du modèle d'accès

`VITE_SUPABASE_ANON_KEY` est une clé **publique**, conçue pour figurer dans le code
envoyé au navigateur. Ce n'est pas elle qui protège les données, c'est la RLS :

- Le rôle `anon` n'a **aucune policy** sur les deux tables : sans session, on ne peut
  ni lire ni écrire directement.
- Le formulaire public passe uniquement par trois fonctions RPC :
  `get_form_by_token`, `mark_link_opened`, `submit_evaluation`.
  Un jeton ouvre un seul formulaire, une seule fois, et cesse de fonctionner
  après soumission ou expiration.
- Toute la consultation (liste, détail, KPI) exige une session authentifiée.

Ne jamais placer la clé `service_role` dans ce projet : elle contourne la RLS.

---

## Charte graphique

La palette est dérivée du logo, relevée directement sur le fichier fourni :

| Rôle | Couleur | Usage |
|---|---|---|
| Vert d'eau | `#41B8AC` | couleur principale — accents, états actifs, graphiques |
| Bleu ciel | `#5AC2EC` | couleur secondaire — dégradés, statuts d'envoi |
| Gris | `#89898C` | texte secondaire, libellés |

Les deux couleurs de marque sont claires : en dessous de 4,5:1 de contraste sur fond
blanc, elles ne portent jamais de texte. Chaque famille descend donc vers des tons
foncés (`teal-600`, `teal-700`, `sky-600`) réservés aux boutons et aux libellés, la
teinte du logo restant sur les aplats, les barres et les états actifs. Le dégradé
`bg-brand` reprend l'enchaînement vert → bleu du cœur du logo.

Tout est centralisé dans `tailwind.config.js` : changer une teinte se fait en un endroit.

Le logo est dans `src/assets/` (importé, donc versionné par Vite) et dans `public/`
pour le favicon et l'icône iOS. Le composant `src/components/Logo.jsx` gère les
quatre tailles et la variante d'impression.

---

## Structure

```
supabase/schema.sql          Tables, RLS, fonctions RPC, vue KPI
src/
  lib/templates.js           Les 12 modèles, générés depuis les .docx
  lib/scoring.js             Calcul des scores, appréciations, moyennes par domaine
  lib/format.js              Dates, téléphone, messages email/WhatsApp
  lib/supabase.js            Client
  assets/logo-centre-diagnostic.png
  components/
    Logo.jsx                 Logo et marque, quatre tailles
    AuthProvider.jsx         Session + route protégée
    Layout.jsx               En-tête et navigation admin
    FicheImprimable.jsx      Rendu document (écran + impression A4)
    Ui.jsx                   Badges, indicateurs, barres, histogramme
  pages/
    Connexion.jsx
    TableauDeBord.jsx        KPI + une carte par modèle
    ListeEvaluations.jsx     Évaluations d'un modèle + liens en attente
    DetailEvaluation.jsx     Fiche complète + bouton PDF
    EnvoyerLien.jsx          Création du lien et du message
    Liens.jsx                Suivi, relance, annulation
    FormulairePublic.jsx     /f/:token — le formulaire de l'évaluateur
```

### Routes

| Route | Accès | Rôle |
|---|---|---|
| `/f/:token` | public | Formulaire rempli par l'évaluateur |
| `/connexion` | public | Connexion RH |
| `/` | authentifié | Tableau de bord |
| `/modeles/:cle` | authentifié | Évaluations d'un modèle |
| `/evaluations/:id` | authentifié | Détail + impression PDF |
| `/envoyer` | authentifié | Nouvel envoi |
| `/liens` | authentifié | Suivi des liens |

---

## Les 12 modèles

### Grilles de fin de contrat — critères notés de 1 à 5

| Clé | Poste | Critères | Barème |
|---|---|---|---|
| `fc-agent-entretien` | Agent d'entretien | 23 | 115 |
| `fc-brancardier` | Brancardier / aide-soignant | 22 | 110 |
| `fc-cuisiniere` | Cuisinière / agent de restauration | 24 | 120 |
| `fc-infirmier-hospitalisation` | Infirmier(ère) hospitalisation | 30 | 150 |
| `fc-infirmier-urgences` | Infirmier(ère) des urgences | 30 | 150 |
| `fc-responsable-achats-stock` | Responsable achats & stock | 27 | 135 |

### Questionnaires métier — 10 questions /10 + cas pratique /40 = 140

`q-agent-entretien`, `q-brancardier`, `q-infirmier-hospitalisation`,
`q-infographe`, `q-technicien-imagerie`

### Grille d'entretien

`ent-agent-accueil` — Agent d'accueil et de facturation : 14 questions réparties
en 10 thèmes + 4 cas pratiques, notation facultative.

### Écarts constatés avec les documents Word

Les totaux imprimés sur les grilles de fin de contrat sont supérieurs de 5 points
à la somme réelle des critères — par exemple « /120 » pour 23 critères, soit 115.
L'application recalcule le barème à partir du nombre réel de critères. Les seuils
d'appréciation reprennent les proportions de vos documents : Insuffisant jusqu'à 40 %,
Satisfaisant jusqu'à 60 %, Bien jusqu'à 80 %, Excellent au-delà.

La grille d'entretien de l'agent d'accueil ne prévoyait pas de barème. Une notation
facultative /10 par question a été ajoutée pour que ce modèle alimente les statistiques ;
laisser les cases vides produit une simple retranscription.

---

## Ajouter ou modifier un modèle

Tout vit dans `src/lib/templates.js`. La base ne stocke que la clé du modèle et
les réponses en JSON : ajouter un poste ne demande aucune migration.

Pour une grille de fin de contrat :

```js
{
  key: 'fc-nouveau-poste',
  categorie: 'fin-contrat',
  titre: 'Évaluation de fin de contrat',
  poste: 'Intitulé du poste',
  service: 'Service',
  missions: ['…'],
  sections: [
    { code: 'A', titre: 'Domaine', criteres: [{ id: 'c1', label: 'Critère…' }] },
  ],
  scoreMax: 5 * nombreDeCriteres,
  paliers: [
    { label: 'Insuffisant',  min: 0,  max: 46 },
    { label: 'Satisfaisant', min: 47, max: 69 },
    { label: 'Bien',         min: 70, max: 92 },
    { label: 'Excellent',    min: 93, max: 115 },
  ],
  signatures: ['Le/La Responsable du Service', "L'Agent Évalué(e)", 'Le/La Responsable RH'],
}
```

Les `id` de critères doivent rester stables : ce sont les clés du JSON `reponses`
des évaluations déjà enregistrées.

---

## Impression PDF

Le bouton « Imprimer / enregistrer en PDF » de la page de détail appelle
`window.print()`. La feuille de style `src/index.css` masque toute l'interface
(`.no-print`) et met en page la fiche seule au format A4, avec des règles
d'évitement de coupure sur les blocs et les lignes de tableau.

Dans la boîte de dialogue d'impression, choisir « Enregistrer au format PDF ».
Aucune bibliothèque tierce n'est nécessaire, et le rendu reste fidèle
à la mise en page du document Word.

---

## Envoi des liens

L'envoi est semi-automatique : l'application génère le lien et le message,
puis ouvre la messagerie (`mailto:`) ou WhatsApp (`wa.me`). Le clic final
sur « Envoyer » reste manuel, ce qui évite tout service tiers et tout coût.

Les numéros gabonais saisis sans indicatif sont complétés avec `+241`.

Pour un envoi réellement automatique, il faudrait une Edge Function Supabase
appelant Resend ou Brevo pour l'email, et l'API WhatsApp Business pour la messagerie.

---

## Déploiement

Le projet est un site statique. Sur Vercel ou Netlify :

- commande de build `npm run build`, dossier `dist`
- variables d'environnement : les trois `VITE_*`, avec `VITE_APP_URL` réglé sur le domaine final
- une réécriture de toutes les routes vers `index.html` est nécessaire (React Router)

Netlify — `public/_redirects` :

```
/*  /index.html  200
```

Vercel — `vercel.json` :

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Enfin, ajouter le domaine de production dans
Supabase → **Authentication → URL Configuration → Site URL**.
