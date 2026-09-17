import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error(
    "Variables d'environnement manquantes. Copiez .env.example en .env, " +
      'renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY, puis relancez le serveur.',
  );
}

export const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true },
});

export const APP_URL = (import.meta.env.VITE_APP_URL || window.location.origin).replace(/\/$/, '');
