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

import { getClientes } from "../api/clientes";

import { useSearchParams } from "react-router-dom";

import { obtenerEspecies } from "../api/especies";
import { obtenerRazasPorEspecie } from "../api/razas";

export default function Mascotas() {

//  lista de mascotas
const [mascotas, setMascotas] = useState([]);

// lista de clientes para selector
const [clientes, setClientes] = useState([]);

const [especies, setEspecies] = useState([]);
const [razas, setRazas] = useState([]);

  //  estado formulario
  const [form, setForm] = useState({
    codigo: "",
    alias: "",
    especieId: "",
    razaId: "",
    color: "",
    clienteId: ""
  });

  //  controla edición
  const [editandoId, setEditandoId] = useState(null);

  // leer parámetros de URL
  const [searchParams] = useSearchParams();

  // obtenemos clienteId desde URL
  const clienteIdFiltro = searchParams.get("clienteId");

  /**
   * Cargar mascotas al abrir pantalla
   */
  useEffect(() => {

    cargarMascotas();
    cargarClientes();
    cargarEspecies();

  }, []);

  /**
   * Obtener mascotas desde backend
   */
  const cargarMascotas = async () => {

    const data = await getMascotas();

    setMascotas(data);
  };

  /**
   *  NUEVO:
   * Obtener clientes desde backend
   *
   * Qué hace:
   * - consulta clientes
   * - llena selector de dueños
   */
  const cargarClientes = async () => {

    const data = await getClientes();

    setClientes(data);
  };

  const cargarEspecies = async () => {

  try {

    const data = await obtenerEspecies();

    setEspecies(data);

    } catch (error) {

    console.error(error);
    }
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

    //  si estamos editando
    if (editandoId) {

      await actualizarMascota(editandoId, form);

    } else {

      await crearMascota(form);
    }

   //  recargar lista
  cargarMascotas();

    //  reset formulario
    setForm({
      codigo: "",
      alias: "",
      especieId: "",
      razaId: "",
      color: "",
      clienteId: ""
    });

    //  salir modo edición
    setEditandoId(null);
  };

  /**
   * Cargar mascota en formulario
   */
  const handleEditar = async (mascota) => {

    // 🔥 NUEVO:
    // cargamos razas según la especie de la mascota
    const data = await obtenerRazasPorEspecie(
      mascota.especieId
    );

    setRazas(data);

    // 🔥 MODIFICADO:
    // cargamos SOLO campos necesarios
    setForm({
      codigo: mascota.codigo,
      alias: mascota.alias,
      especieId: mascota.especieId,
      razaId: mascota.razaId,
      color: mascota.color,
      clienteId: mascota.clienteId
    });

    setEditandoId(mascota.id);
  };

  const handleEspecieChange = async (e) => {

    const especieId = e.target.value;

    setForm({
      ...form,
      especieId,
      razaId: ""
    });

    try {

      const data = await obtenerRazasPorEspecie(especieId);

      setRazas(data);

    } catch (error) {

      console.error(error);
    }
  };


  return (
    <Layout>

      {/* TITULO */}
      <h1 className="text-2xl font-bold mb-6">
        Mascotas
      </h1>

      {/* NUEVO:
        banner contextual cuando hay filtro */}
      {clienteIdFiltro && (

        <div className="bg-blue-100 border border-blue-300 text-blue-800 p-3 rounded mb-4">

          Mostrando mascotas del cliente seleccionado

        </div>
      )}

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

          <select
            name="especieId"
            value={form.especieId}
            onChange={handleEspecieChange}
            className="border p-2 rounded"
          >

            <option value="">
              Seleccionar especie
            </option>

            {especies.map((e) => (

              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>

            ))}

          </select>

          <select
            name="razaId"
            value={form.razaId}
            onChange={handleChange}
            className="border p-2 rounded"
          >

            <option value="">
              Seleccionar raza
            </option>

            {razas.map((r) => (

              <option key={r.id} value={r.id}>
                {r.nombre}
              </option>

            ))}

          </select>

          <input
            type="text"
            name="color"
            placeholder="Color"
            value={form.color}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/*  NUEVO:
            selector real de clientes */}
          <select
            name="clienteId"
            value={form.clienteId}
            onChange={handleChange}
            className="border p-2 rounded"
          >

            {/* opción vacía */}
            <option value="">
              Seleccionar dueño
            </option>

            {/*  recorremos clientes */}
            {clientes.map((c) => (

              <option
                key={c.id}
                value={c.id}
              >

                {c.codigo} - {c.apellidoPrincipal}

              </option>
            ))}

          </select>

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

              <th className="text-left p-2">Nro Mascota</th>
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">Especie</th>
              <th className="text-left p-2">Raza</th>
              <th className="text-left p-2">Color</th>
              <th className="text-left p-2">Dueño</th>
              <th className="text-left p-2">Acciones</th>

            </tr>

          </thead>

          <tbody>

            {mascotas
              .filter((m) => {

                //  si NO hay filtro → mostrar todas
                if (!clienteIdFiltro) return true;

                //  si hay filtro → solo mascotas del cliente
                return m.clienteId === Number(clienteIdFiltro);
              })
              .map((m) => (

              <tr
                key={m.id}

                className={`
                  border-b hover:bg-gray-50

                  ${
                    clienteIdFiltro &&
                    m.clienteId === Number(clienteIdFiltro)

                    ? "bg-blue-50"
                    : ""
                  }
                `}
              >

                <td className="p-2">{m.codigo}</td>
                <td className="p-2">{m.alias}</td>
                <td className="p-2 font-medium">
                  {m.especieNombre}
                </td>
                <td className="p-2">
                  {m.razaNombre}
                </td>
                <td className="p-2">{m.color}</td>
                {/* NUEVO:
                  mostramos código + apellido del cliente */}
                <td className="p-2 font-medium text-blue-700">

                  {m.clienteCodigo} - {m.clienteApellido}

                </td>

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