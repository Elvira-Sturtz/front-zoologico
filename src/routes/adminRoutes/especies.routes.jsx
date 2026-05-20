import { Route } from "react-router-dom";

import ProtectedRoute from "../ProtectedRoute";

import Especies from "../pages/admin/especies/Especies";
import EspecieForm from "../pages/admin/especies/EspecieForm";

const EspeciesRoutes = () => {
  return (
    <>
      <Route
        path="/especies"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Especies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/especies/nueva"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <EspecieForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/especies/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <EspecieForm />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default EspeciesRoutes;

{
  /* 
<Route
        path="/especies"
        element={<Especies />}
      />
      <Route
        path="/especies/nueva"
        element={<EspecieForm />}
      />
      <Route
        path="/especies/:id"
        element={<EspecieForm />}
      />
 */
}
