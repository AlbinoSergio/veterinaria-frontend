/**
 * Servicio de autenticación
 *
 * Qué hace:
 * - llama al backend para login
 * - guarda token en localStorage
 * - permite obtener token después
 *
 * Tecnologías:
 * - JavaScript (fetch)
 * - React (lo consumirá después)
 */

import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://localhost:8080";

/**
 * Login
 */
export const login = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // 🔥 ahora coincide perfecto
  });

  if (!res.ok) {
    throw new Error("Credenciales inválidas");
  }

  const token = await res.text();

  localStorage.setItem("token", token);

  return token;
};

/**
 * Obtener token
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Logout
 */
export const logout = () => {
  localStorage.removeItem("token");
};

/**
 * Obtener usuario desde token
 */
export const getUser = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return jwtDecode(token); //  decodifica payload
  } catch (e) {
    return null;
  }
};

/**
 * Verifica si el token expiró
 */
export const isTokenExpired = () => {

  const token = getToken();

  // si no hay token → expirado
  if (!token) return true;

  try {

    // decodificamos JWT
    const decoded = jwtDecode(token);

    // tiempo actual en segundos
    const currentTime = Date.now() / 1000;

    // true si expiró
    return decoded.exp < currentTime;

  } catch (e) {
    return true;
  }
};