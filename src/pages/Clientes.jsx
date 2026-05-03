/**
 * Página de Clientes
 *
 * Ahora:
 * ✔ lista clientes
 * ✔ crear cliente
 * ✔ editar cliente ( NUEVO)
 * ✔ incluye DIRECCIÓN
 *
 * Tecnologías:
 * - React (estado + eventos)
 * - Tailwind (UI)
 * - Fetch API (backend)
 */

import { useEffect, useState } from "react";
import Layout from "../components/Layout";

//  MODIFICADO: agregamos actualizarCliente
import { getClientes, crearCliente, actualizarCliente, eliminarCliente  } from "../api/clientes";

export default function Clientes() {

  // Lista de clientes
  const [clientes, setClientes] = useState([]);

  //  NUEVO: estado para saber si estamos editando
  const [editandoId, setEditandoId] = useState(null);

  // Estado del formulario
  const [nuevoCliente, setNuevoCliente] = useState({
    apellidoPrincipal: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  // Cargar clientes al iniciar
  useEffect(() => {
    cargarClientes();
  }, []);

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
   *  NUEVO: cargar datos en el formulario para editar
   */
  const handleEditar = (cliente) => {
    setNuevoCliente({
      apellidoPrincipal: cliente.apellidoPrincipal,
      email: cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion || "",
    });

    setEditandoId(cliente.id); // guardamos qué cliente estamos editando
  };

  /**
 * NUEVO: eliminar cliente
 */
const handleEliminar = async (id) => {

  // Confirmación (muy importante UX básica)
  const confirmar = window.confirm("¿Seguro que querés eliminar este cliente?");

  if (!confirmar) return;

  await eliminarCliente(id);

  cargarClientes(); // refresca tabla
};

  /**
   * Crear o actualizar cliente
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const clienteCompleto = {
      ...nuevoCliente,
      codigo: "AUTO",
      cuentaBancaria: "000",
    };

    if (editandoId) {
      //  NUEVO: UPDATE
      await actualizarCliente(editandoId, clienteCompleto);
    } else {
      // CREATE
      await crearCliente(clienteCompleto);
    }

    cargarClientes();

    // reset form
    setNuevoCliente({
      apellidoPrincipal: "",
      email: "",
      telefono: "",
      direccion: "",
    });

    setEditandoId(null); //  NUEVO: salir de modo edición
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>

      {/*  FORMULARIO */}
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

        {/*  MODIFICADO: cambia el texto según si editás o creás */}
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          {editandoId ? "Actualizar Cliente" : "Crear Cliente"}
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
              <th className="text-left p-2">Dirección</th>

              {/*  NUEVO */}
              <th className="text-left p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{c.apellidoPrincipal}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.telefono}</td>
                <td className="p-2">{c.direccion}</td>

                {/*  NUEVO: botón editar */}
                <td className="p-2">
                  <div className="flex gap-2">
                    
                    <button
                      onClick={() => handleEditar(c)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleEliminar(c.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Eliminar
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </Layout>
  );
}