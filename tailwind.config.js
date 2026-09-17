/**
 * Palette dérivée du logo Centre Diagnostic.
 * Trois couleurs sources, relevées sur le fichier fourni :
 *   vert d'eau  #41B8AC   (cœur, croix)
 *   bleu ciel   #5AC2EC   (silhouette, stéthoscope)
 *   gris        #89898C   (typographie « Centre Diagnostic »)
 *
 * Les deux couleurs de marque sont trop claires pour porter du texte
 * sur fond blanc : chaque famille descend donc vers des tons foncés
 * utilisables en libellés et en boutons, la teinte du logo restant
 * réservée aux accents, aux graphiques et aux états actifs.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F8F8',
        canvas: '#FFFFFF',

        // Vert d'eau — couleur principale de l'interface
        teal: {
          50: '#EDF9F7',
          100: '#D4F0EC',
          200: '#A8E2DA',
          300: '#71CFC3',
          400: '#41B8AC',
          500: '#2E9E93',
          600: '#1D7A71',
          700: '#155C55',
          800: '#0F433E',
        },

        // Bleu ciel — couleur secondaire
        sky: {
          50: '#EDF7FD',
          100: '#D2ECFA',
          200: '#A9DCF5',
          300: '#7CCEF0',
          400: '#5AC2EC',
          500: '#2BA3D3',
          600: '#1B7FA8',
          700: '#156383',
        },

        // Gris de la typographie du logo, étendu en échelle neutre
        ink: {
          DEFAULT: '#2B2E31',
          soft: '#4F5357',
          faint: '#89898C',
        },
        rule: '#E1E4E5',
        wash: '#EEF1F2',

        // Couleurs de statut, accordées à la palette
        warn: { 50: '#FDF4E5', 500: '#C08422', 600: '#96661A' },
        alert: { 50: '#FCEEEC', 500: '#B24436', 600: '#8C3429' },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        serif: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(43,46,49,.04), 0 10px 28px -20px rgba(21,92,85,.35)',
        lift: '0 2px 4px rgba(43,46,49,.06), 0 18px 40px -24px rgba(21,92,85,.45)',
        bar: '0 -8px 24px -18px rgba(43,46,49,.5)',
      },
      backgroundImage: {
        brand: 'linear-gradient(105deg, #41B8AC 0%, #5AC2EC 100%)',
        'brand-soft': 'linear-gradient(105deg, #EDF9F7 0%, #EDF7FD 100%)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
      },
      animation: { 'fade-in': 'fade-in .2s ease-out' },
    },
  },
  plugins: [],
};
