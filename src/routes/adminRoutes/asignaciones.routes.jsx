import Asignaciones from "../../pages/admin/Asignaciones";
import ProtectedRoute from "../ProtectedRoute";

const AsignacionesRoutes = [
  {
    path: "/asignaciones",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Asignaciones />
      </ProtectedRoute>
    ),
  },
];

export default AsignacionesRoutes;
