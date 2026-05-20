import { Route } from "react-router-dom";

import ProtectedRoute from "../ProtectedRoute";

import Zonas from "../pages/admin/zonas/Zonas";
import ZonaForm from "../pages/admin/zonas/ZonaForm";

const ZonaRoutes = () => {
  return (
    <>
      <Route
        path="/zonas"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Zonas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/zonas/nueva"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ZonaForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/zonas/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ZonaForm />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default ZonaRoutes;
