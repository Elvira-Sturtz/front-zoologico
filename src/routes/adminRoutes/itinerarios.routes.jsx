import { Route } from "react-router-dom";

import ProtectedRoute from "../ProtectedRoute";

import Itinerarios from "../../pages/admin/itinerarios/Itinerarios";
import ItinerarioForm from "../../pages/admin/itinerarios/ItinerarioForm";

const ItinerarioRoutes = () => {
  return (
    <>
      <Route
        path="/itinerarios"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Itinerarios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/itinerarios/nuevo"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ItinerarioForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/itinerarios/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ItinerarioForm />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default ItinerarioRoutes;
