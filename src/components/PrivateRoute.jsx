/**
 * Componente que protege rutas
 *
 * Qué hace:
 * - verifica si hay token
 * - si no hay → redirige a login
 */

import { Navigate } from "react-router-dom";
import { getToken } from "../api/auth";

export default function PrivateRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}