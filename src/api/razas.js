import { getToken } from "./auth";

const BASE_URL = "http://localhost:8080";

/**
 * Obtener razas por especie
 */
export const obtenerRazasPorEspecie = async (especieId) => {

  const res = await fetch(
    `${BASE_URL}/razas/especie/${especieId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return await res.json();
};

