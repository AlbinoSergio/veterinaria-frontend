/**
 * API de Mascotas
 *
 * Qué hace:
 * - conecta frontend con backend
 * - maneja requests HTTP
 */

import { getToken } from "./auth";

const BASE_URL = "http://localhost:8080";

/**
 * Obtener todas las mascotas
 */
export const getMascotas = async () => {

  const res = await fetch(`${BASE_URL}/mascotas`, {

    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return await res.json();
};

/**
 * Crear mascota
 */
export const crearMascota = async (mascota) => {

  const res = await fetch(`${BASE_URL}/mascotas`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },

    body: JSON.stringify(mascota)
  });

  return await res.json();
};

/**
 * Editar mascota
 */
export const actualizarMascota = async (id, mascota) => {

  const res = await fetch(`${BASE_URL}/mascotas/${id}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },

    body: JSON.stringify(mascota)
  });

  return await res.json();
};

/**
 * Obtener mascotas por cliente
 */
export const getMascotasPorCliente = async (clienteId) => {

  const res = await fetch(`${BASE_URL}/mascotas/cliente/${clienteId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return await res.json();
};

