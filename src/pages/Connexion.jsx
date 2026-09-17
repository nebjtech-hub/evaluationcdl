import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../components/AuthProvider';
import Logo from '../components/Logo';
import { Erreur } from '../components/Ui';

export default function Connexion() {
  const { session, chargement } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [voirMdp, setVoirMdp] = useState(false);
  const [erreur, setErreur] = useState('');
  const [enCours, setEnCours] = useState(false);

  if (!chargement && session) return <Navigate to={location.state?.from?.pathname || '/'} replace />;

  const soumettre = async (e) => {
    e.preventDefault();
    setErreur('');
    setEnCours(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse });
    setEnCours(false);
    if (error) {
      setErreur(
        error.message === 'Invalid login credentials'
          ? 'Email ou mot de passe incorrect.'
          : error.message,
      );
      return;
    }
    navigate(location.state?.from?.pathname || '/', { replace: true });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      {/* Panneau de marque */}
      <div className="relative hidden flex-col justify-between bg-brand p-10 text-white lg:flex">
        <div className="rounded-xl bg-white/95 p-5 shadow-lift">
          <Logo taille="lg" />
        </div>
        <div>
          <p className="font-serif text-3xl leading-tight">
            Les évaluations du personnel,
            <br />
            réunies en un seul endroit.
          </p>
          <p className="mt-4 max-w-sm text-sm text-white/85">
            Envoi des formulaires aux responsables de service, suivi des retours, impression des
            fiches et statistiques par poste.
          </p>
        </div>
        <p className="text-xs text-white/70">
          Service des Ressources Humaines — Centre Diagnostic de Libreville
        </p>
      </div>

      {/* Formulaire */}
      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Logo taille="lg" />
          </div>

          <h1 className="mt-8 font-serif text-2xl">Espace Ressources Humaines</h1>
          <p className="mt-1 text-sm text-ink-faint">
            Connectez-vous pour consulter et envoyer les évaluations.
          </p>

          <form onSubmit={soumettre} className="mt-8 space-y-5">
            <div>
              <label className="label" htmlFor="email">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="username"
                autoFocus
                className="field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="label" htmlFor="mdp">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="mdp"
                  type={voirMdp ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  className="field pr-20"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setVoirMdp((v) => !v)}
                  className="absolute inset-y-0 right-2 my-1 rounded-md px-2 text-xs font-medium text-ink-faint hover:bg-wash hover:text-ink"
                >
                  {voirMdp ? 'Masquer' : 'Afficher'}
                </button>
              </div>
            </div>

            <Erreur>{erreur}</Erreur>

            <button type="submit" className="btn-primary w-full" disabled={enCours}>
              {enCours ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>

          <p className="mt-6 border-t border-rule pt-4 text-xs text-ink-faint">
            Les comptes sont créés par l'administrateur depuis Supabase. En cas d'oubli de mot de
            passe, adressez-vous au service informatique.
          </p>
        </div>
      </div>
    </div>
  );
}
