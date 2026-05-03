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

const BASE_URL = "http://localhost:8080";

/**
 * Login
 */
export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Credenciales inválidas");
  }

  const token = await res.text(); //  backend devuelve string, no JSON

  //  guardamos token
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