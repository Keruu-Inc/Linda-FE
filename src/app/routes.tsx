import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { PatientsPage } from "../features/profiles/pages/PatientsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<PatientsPage />} />
      </Route>
    </Routes>
  );
}
