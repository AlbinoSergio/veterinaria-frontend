const BASE_URL = "http://localhost:8080";

export const getTopClientes = async () => {
  const res = await fetch(`${BASE_URL}/reportes/top-clientes`);
  return res.json();
};

export const getProductosMasVendidos = async () => {
  const res = await fetch(`${BASE_URL}/reportes/productos-mas-vendidos`);
  return res.json();
};

export const getFacturacionPorTipo = async () => {
  const res = await fetch(`${BASE_URL}/reportes/facturacion-por-tipo`);
  return res.json();
};

export const getResumenClientes = async () => {
  const res = await fetch(`${BASE_URL}/reportes/clientes-resumen`);
  return res.json();
};

export const getPersonasPorCliente = async (id) => {
  const res = await fetch(`${BASE_URL}/persona-cliente/cliente/${id}`);
  return res.json();
};