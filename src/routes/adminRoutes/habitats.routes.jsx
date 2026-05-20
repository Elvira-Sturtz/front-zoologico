import { Route } from "react-router-dom";

import Habitats from "../pages/admin/habitats/Habitats";
import HabitatForm from "../pages/admin/habitats/HabitatForm";

const HabitatRoutes = () => {
  return (
    <>
      <Route
        path="/habitats"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Habitats />
          </ProtectedRoute>
        }
      />
      <Route
        path="/habitats/nueva"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <HabitatForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/habitats/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <HabitatForm />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default HabitatRoutes;
