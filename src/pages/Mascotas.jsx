/**
 * Página de Mascotas
 *
 * Qué hace:
 * - listar mascotas
 * - crear mascotas
 * - editar mascotas
 *
 * Tecnologías:
 * - React
 * - Tailwind
 * - JWT
 */

import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {
  getMascotas,
  crearMascota,
  actualizarMascota
} from "../api/mascotas";

export default function Mascotas() {

  // 🔥 lista de mascotas
  const [mascotas, setMascotas] = useState([]);

  // 🔥 estado formulario
  const [form, setForm] = useState({
    codigo: "",
    alias: "",
    especie: "",
    raza: "",
    color: "",
    clienteId: ""
  });

  // 🔥 controla edición
  const [editandoId, setEditandoId] = useState(null);

  /**
   * Cargar mascotas al abrir pantalla
   */
  useEffect(() => {
    cargarMascotas();
  }, []);

  /**
   * Obtener mascotas desde backend
   */
  const cargarMascotas = async () => {

    const data = await getMascotas();

    setMascotas(data);
  };

  /**
   * Actualiza formulario
   */
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Crear o editar mascota
   */
  const handleSubmit = async (e) => {

    e.preventDefault();

    // 🔥 si estamos editando
    if (editandoId) {

      await actualizarMascota(editandoId, form);

    } else {

      await crearMascota(form);
    }

    // 🔥 recargar lista
    cargarMascotas();

    // 🔥 reset formulario
    setForm({
      codigo: "",
      alias: "",
      especie: "",
      raza: "",
      color: "",
      clienteId: ""
    });

    // 🔥 salir modo edición
    setEditandoId(null);
  };

  /**
   * Cargar mascota en formulario
   */
  const handleEditar = (mascota) => {

    setForm(mascota);

    setEditandoId(mascota.id);
  };

  return (
    <Layout>

      {/* TITULO */}
      <h1 className="text-2xl font-bold mb-6">
        Mascotas
      </h1>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-6"
      >

        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            name="codigo"
            placeholder="Código"
            value={form.codigo}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="alias"
            placeholder="Nombre mascota"
            value={form.alias}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="especie"
            placeholder="Especie"
            value={form.especie}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="raza"
            placeholder="Raza"
            value={form.raza}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="color"
            placeholder="Color"
            value={form.color}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="clienteId"
            placeholder="ID Cliente"
            value={form.clienteId}
            onChange={handleChange}
            className="border p-2 rounded"
          />

        </div>

        <button
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {editandoId ? "Actualizar Mascota" : "Crear Mascota"}
        </button>

      </form>

      {/* TABLA */}
      <div className="bg-white rounded shadow p-4">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-2">Código</th>
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">Especie</th>
              <th className="text-left p-2">Raza</th>
              <th className="text-left p-2">Color</th>
              <th className="text-left p-2">Cliente ID</th>
              <th className="text-left p-2">Acciones</th>

            </tr>

          </thead>

          <tbody>

            {mascotas.map((m) => (

              <tr
                key={m.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-2">{m.codigo}</td>
                <td className="p-2">{m.alias}</td>
                <td className="p-2">{m.especie}</td>
                <td className="p-2">{m.raza}</td>
                <td className="p-2">{m.color}</td>
                <td className="p-2">{m.clienteId}</td>

                <td className="p-2">

                  <button
                    onClick={() => handleEditar(m)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}