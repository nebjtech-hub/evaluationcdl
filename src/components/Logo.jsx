import logo from '../assets/logo-centre-diagnostic.png';

const HAUTEURS = {
  sm: 'h-7',
  md: 'h-9',
  lg: 'h-12',
  xl: 'h-16',
};

/**
 * Logo Centre Diagnostic.
 * `taille` règle la hauteur, la largeur suit le ratio d'origine (621 × 210).
 */
export default function Logo({ taille = 'md', className = '', print = false }) {
  return (
    <img
      src={logo}
      alt="Centre Diagnostic"
      width={621}
      height={210}
      className={`w-auto ${HAUTEURS[taille]} ${print ? 'print-logo' : ''} ${className}`}
    />
  );
}

/** Marque seule (cœur au stéthoscope), recadrée depuis le logo complet. */
export function Marque({ className = 'h-8 w-8' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: '296% auto',
        backgroundPosition: 'left center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}
