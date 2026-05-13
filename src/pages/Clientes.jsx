/**
 * Página de Clientes
 *
 * ✔ lista clientes
 * ✔ crear cliente
 * ✔ editar cliente (🔥 TODOS)
 * ✔ eliminar cliente (🔥 solo ADMIN)
 */

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getClientes, crearCliente, eliminarCliente } from "../api/clientes";
import { getUser } from "../api/auth";

export default function Clientes() {

  const [clientes, setClientes] = useState([]);

  const [nuevoCliente, setNuevoCliente] = useState({
    apellidoPrincipal: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  // 🔥 NUEVO: estado para saber si estamos editando
  const [editando, setEditando] = useState(null);

  const user = getUser();

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = () => {
    getClientes().then(setClientes);
  };

  const handleChange = (e) => {
    setNuevoCliente({
      ...nuevoCliente,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * 🔥 MODIFICADO:
   * - si estamos editando → actualizar
   * - si no → crear
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const clienteCompleto = {
      ...nuevoCliente,
      codigo: "AUTO",
      cuentaBancaria: "000",
    };

    if (editando) {
      // 🔥 EDITAR
      await fetch(`http://localhost:8080/clientes/${editando.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(clienteCompleto),
      });

      setEditando(null); // salir de modo edición
    } else {
      // 🔥 CREAR
      await crearCliente(clienteCompleto);
    }

    cargarClientes();

    setNuevoCliente({
      apellidoPrincipal: "",
      email: "",
      telefono: "",
      direccion: "",
    });
  };

  /**
   * 🔥 NUEVO: cargar datos al formulario para editar
   */
  const handleEditar = (cliente) => {
    setNuevoCliente(cliente);
    setEditando(cliente);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">

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

          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={nuevoCliente.direccion}
            onChange={handleChange}
            className="border p-2 rounded"
          />

        </div>

        {/* 🔥 TEXTO DINÁMICO */}
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          {editando ? "Actualizar Cliente" : "Crear Cliente"}
        </button>

      </form>

      {/* TABLA */}
      <div className="bg-white rounded shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {/* NUEVO: código visible del cliente */}
              <th className="text-left p-2">Nro Cliente</th>

              <th className="text-left p-2">Apellido</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Teléfono</th>
              <th className="text-left p-2">Dirección</th>
              <th className="text-left p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                {/*  NUEVO: mostramos código negocio */}
                <td className="p-2 font-medium text-blue-700">
                  {c.codigo}
                </td>

                <td className="p-2">{c.apellidoPrincipal}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.telefono}</td>
                <td className="p-2">{c.direccion}</td>

                <td className="p-2 flex gap-2">

                  {/* 🔥 EDITAR → TODOS */}
                  <button
                    onClick={() => handleEditar(c)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>

                  {/* 🔥 ELIMINAR → SOLO ADMIN */}
                  {user?.rol === "ADMIN" && (
                    <button
                      onClick={() => eliminarCliente(c.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  )}

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </Layout>
  );
}