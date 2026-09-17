import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, RequireAuth } from './components/AuthProvider';
import Layout from './components/Layout';
import Connexion from './pages/Connexion';
import TableauDeBord from './pages/TableauDeBord';
import ListeEvaluations from './pages/ListeEvaluations';
import DetailEvaluation from './pages/DetailEvaluation';
import EnvoyerLien from './pages/EnvoyerLien';
import Liens from './pages/Liens';
import FormulairePublic from './pages/FormulairePublic';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Accès public par jeton — aucune authentification */}
        <Route path="/f/:token" element={<FormulairePublic />} />

        <Route path="/connexion" element={<Connexion />} />

        <Route
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/" element={<TableauDeBord />} />
          <Route path="/modeles/:cle" element={<ListeEvaluations />} />
          <Route path="/evaluations/:id" element={<DetailEvaluation />} />
          <Route path="/liens" element={<Liens />} />
          <Route path="/envoyer" element={<EnvoyerLien />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
