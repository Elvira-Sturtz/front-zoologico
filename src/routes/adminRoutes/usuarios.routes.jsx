// import { Route } from "react-router-dom";
// import { Fragment } from "react";
// import ProtectedRoute from "../ProtectedRoute";

// import Usuarios from "../../pages/admin/usuarios/Usuarios";
// import UsuarioForm from "../../pages/admin/usuarios/UsuarioForm";

// const UsuarioRoutes = (
//   <>
//     <Route
//       path="/usuarios"
//       element={
//         <ProtectedRoute allowedRoles={["admin"]}>
//           <Usuarios />
//         </ProtectedRoute>
//       }
//     />
//     <Route
//       path="/usuarios/nuevo"
//       element={
//         <ProtectedRoute allowedRoles={["admin"]}>
//           <UsuarioForm />
//         </ProtectedRoute>
//       }
//     />
//     <Route
//       path="/usuarios/:id"
//       element={
//         <ProtectedRoute allowedRoles={["admin"]}>
//           <UsuarioForm />
//         </ProtectedRoute>
//       }
//     />
//   </>
// );

// export default UsuarioRoutes;

import ProtectedRoute from "../ProtectedRoute";

import Usuarios from "../../pages/admin/usuarios/Usuarios";
import UsuarioForm from "../../pages/admin/usuarios/UsuarioForm";

const UsuarioRoutes = [
  {
    path: "/usuarios",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Usuarios />
      </ProtectedRoute>
    ),
  },

  {
    path: "/usuarios/nuevo",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <UsuarioForm />
      </ProtectedRoute>
    ),
  },

  {
    path: "/usuarios/:id",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <UsuarioForm />
      </ProtectedRoute>
    ),
  },
];

export default UsuarioRoutes;
