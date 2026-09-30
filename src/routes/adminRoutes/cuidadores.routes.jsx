import ProtectedRoute from "../ProtectedRoute";

import Cuidadores from "../../pages/admin/cuidadores/Cuidadores";
import CuidadorForm from "../../pages/admin/cuidadores/CuidadorForm";

const CuidadorRoutes = [
  {
    path: "/cuidadores",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Cuidadores />
      </ProtectedRoute>
    ),
  },

  {
    path: "/cuidadores/nuevo",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <CuidadorForm />
      </ProtectedRoute>
    ),
  },

  {
    path: "/cuidadores/:id",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <CuidadorForm />
      </ProtectedRoute>
    ),
  },
];

export default CuidadorRoutes;
