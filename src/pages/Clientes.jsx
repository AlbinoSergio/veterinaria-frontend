/**
 * Página de Clientes
 *
 * Ahora:
 * ✔ lista clientes
 * ✔ permite crear nuevos clientes
 * ✔ incluye DIRECCIÓN (nuevo)
 *
 * Tecnologías:
 * - React (estado + eventos)
 * - Tailwind (UI)
 * - Fetch API (backend)
 */

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getClientes, crearCliente } from "../api/clientes";

export default function Clientes() {

  // Lista de clientes
  const [clientes, setClientes] = useState([]);

  // 🔥 MODIFICADO: agregamos direccion al estado
  const [nuevoCliente, setNuevoCliente] = useState({
    apellidoPrincipal: "",
    email: "",
    telefono: "",
    direccion: "", // ✅ NUEVO CAMPO
  });

  // Cargar clientes al iniciar
  useEffect(() => {
    cargarClientes();
  }, []);

  // Función para traer clientes del backend
  const cargarClientes = () => {
    getClientes().then(setClientes);
  };

  /**
   * Maneja cambios en inputs
   */
  const handleChange = (e) => {
    setNuevoCliente({
      ...nuevoCliente,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Crear cliente
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 MODIFICADO: ahora incluye direccion real del form
    const clienteCompleto = {
      ...nuevoCliente,

      // ⚠️ Estos los dejamos temporalmente
      codigo: "AUTO",
      cuentaBancaria: "000",
    };

    await crearCliente(clienteCompleto);

    cargarClientes();

    // 🔥 MODIFICADO: limpiamos también direccion
    setNuevoCliente({
      apellidoPrincipal: "",
      email: "",
      telefono: "",
      direccion: "", // ✅ limpiar también
    });
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>

      {/* 🔵 FORMULARIO */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">

        {/* 🔥 MODIFICADO: ahora 4 columnas en vez de 3 */}
        <div className="grid grid-cols-4 gap-4">

          <input
            type="text"
            name="apellidoPrincipal"
            placeholder="Apellido"
            value={nuevoCliente.apellidoPrincipal}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={nuevoCliente.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={nuevoCliente.telefono}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* 🔥 NUEVO INPUT: DIRECCIÓN */}
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={nuevoCliente.direccion}
            onChange={handleChange}
            className="border p-2 rounded"
          />

        </div>

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Crear Cliente
        </button>

      </form>

      {/* 🔵 TABLA */}
      <div className="bg-white rounded shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Apellido</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Teléfono</th>

              {/* 🔥 NUEVA COLUMNA */}
              <th className="text-left p-2">Dirección</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{c.apellidoPrincipal}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.telefono}</td>

                {/* 🔥 NUEVO CAMPO */}
                <td className="p-2">{c.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </Layout>
  );
}