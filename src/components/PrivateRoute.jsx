import { Navigate } from "react-router-dom";
import { getToken, logout, isTokenExpired } from "../api/auth";

/**
 * Protección de rutas
 *
 * Seguridad:
 * - verifica token
 * - verifica expiración
 */
export default function PrivateRoute({ children }) {

  const token = getToken();

  // 🔥 si no hay token
  if (!token) {
    return <Navigate to="/" />;
  }

  // 🔥 si expiró
  if (isTokenExpired()) {

    logout(); // limpia sesión

    return <Navigate to="/" />;
  }

  return children;
}

