/**
 * Este archivo se encarga de comunicarse con el backend
 * para todo lo relacionado con CLIENTES
 *
 * Tecnologías:
 * - JavaScript (fetch API)
 * - consume endpoints de Spring Boot
 */

const BASE_URL = "http://localhost:8080";

/**
 * Obtiene todos los clientes desde el backend
 * Hace un GET a /clientes
 */
export const getClientes = async () => {
  const res = await fetch(`${BASE_URL}/clientes`);
  return res.json(); // convierte la respuesta a JSON
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