// import { BrowserRouter, Routes, Route } from "react-router-dom";

// //import { useRoutes } from "react-router-dom";

// import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";

// import MisItinerarios from "../pages/guia/MisItinerarios";
// import MisEspecies from "../pages/cuidador/MisEspecies";

// import AsignarCuidador from "../pages/admin/asignaciones/AsignarCuidador";

// import ProtectedRoute from "./ProtectedRoute";

// import EspeciesRoutes from "./adminRoutes/especies.routes";
// import HabitatRoutes from "./adminRoutes/habitats.routes";
// import ZonaRoutes from "./adminRoutes/zonas.routes";
// import ItinerarioRoutes from "./adminRoutes/itinerarios.routes";
// import UsuarioRoutes from "./adminRoutes/usuarios.routes";

// // const routes = [
// //   ...EspeciesRoutes,
// //   ...HabitatRoutes,
// //   ...ZonaRoutes,
// //   ...ItinerarioRoutes,
// //   ...UsuarioRoutes,
// // ];

// // const routes = [...EspeciesRoutes];

// // const AppRoutes = () => {
// //   const element = useRoutes(routes);

// //   return element;
// // };

// const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Pública */}
//         <Route
//           path="/"
//           element={<Login />}
//         />

//         {/* Dashboard (todos logueados) Usuario Autenticado*/}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         {HabitatRoutes}
//         {ZonaRoutes}
//         {ItinerarioRoutes}
//         {UsuarioRoutes}
//         {/* <AppRoutes /> */}
//         {/* RUTAS DEL ADMIN */}
//         {EspeciesRoutes}

//         {/* RUTAS DEL ADMIN
//         <EspeciesRoutes />
//         <HabitatRoutes />
//         <ZonaRoutes />
//         <ItinerarioRoutes />
//         <UsuarioRoutes /> */}

//         <Route
//           path="/asignaciones"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <AsignarCuidador />
//             </ProtectedRoute>
//           }
//         />

//         {/* GUÍA */}
//         <Route
//           path="/mis-itinerarios"
//           element={
//             <ProtectedRoute allowedRoles={["guia"]}>
//               <MisItinerarios />
//             </ProtectedRoute>
//           }
//         />

//         {/* CUIDADOR */}
//         <Route
//           path="/mis-especies"
//           element={
//             <ProtectedRoute allowedRoles={["cuidador"]}>
//               <MisEspecies />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="*"
//           element={<h1>404 Not Found</h1>}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRouter;
import { BrowserRouter, useRoutes } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import MisItinerarios from "../pages/guia/MisItinerarios";
import MisEspecies from "../pages/cuidador/MisEspecies";

import AsignarCuidador from "../pages/admin/asignaciones/AsignarCuidador";

import ProtectedRoute from "./ProtectedRoute";

import EspeciesRoutes from "./adminRoutes/especies.routes";
import HabitatRoutes from "./adminRoutes/habitats.routes";
import ZonaRoutes from "./adminRoutes/zonas.routes";
import ItinerarioRoutes from "./adminRoutes/itinerarios.routes";
import UsuarioRoutes from "./adminRoutes/usuarios.routes";
import CuidadorRoutes from "./adminRoutes/cuidadores.routes";

const AppRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <Login />,
    },

    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },

    ...EspeciesRoutes,
    ...HabitatRoutes,
    ...ZonaRoutes,
    ...ItinerarioRoutes,
    ...CuidadorRoutes,
    ...UsuarioRoutes,

    {
      path: "/asignaciones",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <AsignarCuidador />
        </ProtectedRoute>
      ),
    },

    {
      path: "/mis-itinerarios",
      element: (
        <ProtectedRoute allowedRoles={["guia"]}>
          <MisItinerarios />
        </ProtectedRoute>
      ),
    },

    {
      path: "/mis-especies",
      element: (
        <ProtectedRoute allowedRoles={["cuidador"]}>
          <MisEspecies />
        </ProtectedRoute>
      ),
    },

    {
      path: "*",
      element: <h1>404 Not Found</h1>,
    },
  ];

  return useRoutes(routes);
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;
