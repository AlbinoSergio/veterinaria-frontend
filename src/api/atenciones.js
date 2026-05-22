import { getToken } from "./auth";

const BASE_URL = "http://localhost:8080";

/**
 * Obtener historial clínico
 */
export const getAtencionesPorMascota = async (mascotaId) => {

  const res = await fetch(
    `${BASE_URL}/atenciones/mascota/${mascotaId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  if (!res.ok) {

    throw new Error(
      "Error al obtener historial clínico"
    );
  }

  return await res.json();
};

/**
 * Crear atención clínica
 */
export const crearAtencion = async (atencion) => {

  const res = await fetch(
    `${BASE_URL}/atenciones`,
    {
      method: "POST",

      headers: {

        "Content-Type": "application/json",

        Authorization: `Bearer ${getToken()}`
      },

      body: JSON.stringify(atencion)
    }
  );

  if (!res.ok) {

    throw new Error(
      "Error al crear atención"
    );
  }

  return await res.json();
};