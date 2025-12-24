import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { PatientsPage } from "../features/profiles/pages/PatientsPage";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { AuthCallback } from "../pages/AuthCallback";
import { ProfilePage } from "../features/profiles/pages/ProfilePage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<PatientsPage />} />
        <Route path="/profile/:patientId" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
