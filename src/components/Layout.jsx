import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthProvider';
import Logo from './Logo';

const liens = [
  { to: '/', libelle: 'Tableau de bord', exact: true },
  { to: '/liens', libelle: 'Liens envoyés' },
  { to: '/envoyer', libelle: 'Nouvel envoi' },
];

const classeLien = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive ? 'bg-teal-50 font-medium text-teal-700' : 'text-ink-soft hover:bg-wash hover:text-ink'
  }`;

export default function Layout() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [menuOuvert, setMenuOuvert] = useState(false);

  const deconnexion = async () => {
    await supabase.auth.signOut();
    navigate('/connexion');
  };

  const initiales = (session?.user?.email || '?').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen">
      <header className="no-print sticky top-0 z-30 border-b border-rule bg-white/95 backdrop-blur">
        <div className="brand-rule" />
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
          <NavLink to="/" className="flex shrink-0 items-center" aria-label="Accueil">
            <Logo taille="md" />
          </NavLink>

          <span className="hidden h-8 w-px bg-rule lg:block" />
          <p className="hidden text-xs uppercase tracking-wide text-ink-faint lg:block">
            Ressources humaines
            <br />
            Évaluations du personnel
          </p>

          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {liens.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.exact} className={classeLien}>
                {l.libelle}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-2">
            <div className="group relative hidden md:block">
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-teal-700 ring-1 ring-teal-100"
                title={session?.user?.email}
                onClick={deconnexion}
                aria-label={`Se déconnecter de ${session?.user?.email || ''}`}
              >
                {initiales}
              </button>
              <span className="pointer-events-none absolute right-0 top-11 hidden whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs text-white group-hover:block">
                Se déconnecter
              </span>
            </div>

            <button
              className="btn-quiet md:hidden"
              onClick={() => setMenuOuvert((o) => !o)}
              aria-expanded={menuOuvert}
              aria-label="Menu"
            >
              {menuOuvert ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {menuOuvert && (
          <nav className="animate-fade-in border-t border-rule bg-white px-5 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {liens.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.exact}
                  className={classeLien}
                  onClick={() => setMenuOuvert(false)}
                >
                  {l.libelle}
                </NavLink>
              ))}
              <button onClick={deconnexion} className="mt-2 border-t border-rule pt-3 text-left text-sm text-ink-faint">
                Se déconnecter — {session?.user?.email}
              </button>
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <Outlet />
      </main>

      <footer className="no-print mx-auto max-w-6xl px-5 pb-8 text-xs text-ink-faint">
        Centre Diagnostic de Libreville — Service des Ressources Humaines. Documents confidentiels.
      </footer>
    </div>
  );
}
