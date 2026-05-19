import { getToken } from "./auth";

const BASE_URL = "http://localhost:8080";

/**
 * Obtener especies
 */
export const obtenerEspecies = async () => {

  const res = await fetch(`${BASE_URL}/especies`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return await res.json();
};