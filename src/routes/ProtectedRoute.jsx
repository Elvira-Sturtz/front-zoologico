import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  /* const token = localStorage.getItem("token");
   const role = localStorage.getItem("role");*/
  const { user, loading } = useAuth();

  // Esperar verificación
  if (loading) {
    return <h1>Cargando...</h1>;
  }

  //  No logueado
  /*if (!token) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }*/
  if (!user) return <Navigate to="/" />;

  //  Rol no permitido
  /* if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }*/
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  //  Permitido
  return children;
};

export default ProtectedRoute;
