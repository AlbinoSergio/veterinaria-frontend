/**
 * Este archivo se encarga de comunicarse con el backend
 * para todo lo relacionado con CLIENTES
 *
 * Tecnologías:
 * - JavaScript (fetch API)
 * - consume endpoints de Spring Boot
 */
import { getToken } from "./auth";

const BASE_URL = "http://localhost:8080";

/**
 * Obtiene todos los clientes desde el backend
 * Hace un GET a /clientes
 */
export const getClientes = async () => {
  const res = await fetch(`${BASE_URL}/clientes`, {
    headers: {
      Authorization: `Bearer ${getToken()}`, // TOKEN
    },
  });

  return res.json();
};

/**
 * Crea un cliente en el backend
 * Hace un POST a /clientes
 */
export const crearCliente = async (cliente) => {
  const res = await fetch(`${BASE_URL}/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!res.ok) {
    throw new Error("Error al crear cliente");
  }

  return res.json();
};

/**
 * Actualiza un cliente en el backend
 * 
 * Qué hace:
 * - Envía un PUT a /clientes/{id}
 * - Usa el ID en la URL
 * - Envía los datos en el body
 *
 * Tecnologías:
 * - JavaScript (fetch)
 * - REST API
 */
export const actualizarCliente = async (id, cliente) => {
  const res = await fetch(`${BASE_URL}/clientes/${id}`, {
    method: "PUT", // tipo de request
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente), // enviamos el cliente actualizado
  });

  if (!res.ok) {
    throw new Error("Error al actualizar cliente");
  }

  return res.json();
};

/**
 * Elimina un cliente en el backend
 */
export const eliminarCliente = async (id) => {
  const res = await fetch(`${BASE_URL}/clientes/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar cliente");
  }
};

/**
 * Obtener cliente por ID
 */
export const getClienteById = async (id) => {

  const res = await fetch(`${BASE_URL}/clientes/${id}`, {

    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return await res.json();
};

