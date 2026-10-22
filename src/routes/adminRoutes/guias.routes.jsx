import ProtectedRoute from "../ProtectedRoute";

import Guias from "../../pages/admin/guias/Guias";
import GuiaForm from "../../pages/admin/guias/GuiaForm";

const GuiaRoutes = [
  {
    path: "/guias",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Guias />
      </ProtectedRoute>
    ),
  },

  {
    path: "/guias/nuevo",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <GuiaForm />
      </ProtectedRoute>
    ),
  },

  {
    path: "/guias/:id",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <GuiaForm />
      </ProtectedRoute>
    ),
  },
];

export default GuiaRoutes;
