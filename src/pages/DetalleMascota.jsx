import {
  useEffect,
  useState,
  useCallback
} from "react";

import { useParams } from "react-router-dom";

import Layout from "../components/Layout";

import { getMascotaById } from "../api/mascotas";

import {
  getAtencionesPorMascota,
  crearAtencion
} from "../api/atenciones";

/**
 * Pantalla:
 * Ficha clínica completa de una mascota
 */
export default function DetalleMascota() {

  // ID de mascota desde URL
  const { id } = useParams();

  /**
   * Estado mascota
   */
  const [mascota, setMascota] = useState(null);

  /**
   * Historial clínico
   */
  const [atenciones, setAtenciones] = useState([]);

  /**
   * Modal nueva atención
   */
  const [mostrarModal, setMostrarModal] = useState(false);

  /**
   * Formulario atención
   */
  const [formAtencion, setFormAtencion] = useState({

    fecha: "",

    motivoConsulta: "",

    diagnostico: "",

    tratamiento: "",

    observaciones: "",

    peso: "",

    temperatura: "",

    requiereSeguimiento: false,

    proximaVisita: "",

    mascotaId: Number(id)
  });

  /**
   * Cargar datos
   */
  useEffect(() => {

    cargarDatos();

  }, [cargarDatos]);

  /**
   * Obtener mascota + historial
   */
  const cargarDatos = useCallback(async () => {

    try {

      // mascota
      const mascotaData = await getMascotaById(id);

      setMascota(mascotaData);

      // historial
      const historial = await getAtencionesPorMascota(id);

      setAtenciones(historial);

    } catch (error) {

      console.error(error);
    }
  }, [id]);

  /**
   * Manejo inputs atención
   */
  const handleChangeAtencion = (e) => {

    const { name, value, type, checked } = e.target;

    setFormAtencion({

      ...formAtencion,

      [name]: type === "checkbox"
        ? checked
        : value
    });
  };

  /**
   * Guardar atención
   */
  const handleGuardarAtencion = async (e) => {

    e.preventDefault();

    try {

      await crearAtencion(formAtencion);

      // cerrar modal
      setMostrarModal(false);

      // refrescar historial
      cargarDatos();

      // limpiar formulario
      setFormAtencion({

        fecha: "",

        motivoConsulta: "",

        diagnostico: "",

        tratamiento: "",

        observaciones: "",

        peso: "",

        temperatura: "",

        requiereSeguimiento: false,

        proximaVisita: "",

        mascotaId: Number(id)
      });

    } catch (error) {

      console.error(error);

      alert("Error al guardar atención");
    }
  };

  /**
   * Loading
   */
  if (!mascota) {

    return (

      <Layout>

        <div className="p-8">

          <p>Cargando ficha clínica...</p>

        </div>

      </Layout>
    );
  }

  return (

    <Layout>

      <div className="p-8">

        {/* ========================= */}
        {/* CABECERA MASCOTA */}
        {/* ========================= */}

        <div className="bg-white rounded shadow p-6 mb-6">

          <h1 className="text-4xl font-bold mb-2">

            {mascota.alias}

          </h1>

          <p className="text-gray-600 text-lg">

            {mascota.especieNombre} - {mascota.razaNombre}

          </p>

          <p className="mt-3">

            <span className="font-semibold">

              Dueño:

            </span>

            {" "}

            {mascota.clienteCodigo} - {mascota.clienteApellido}

          </p>

        </div>

        {/* ========================= */}
        {/* HISTORIAL */}
        {/* ========================= */}

        <div className="bg-white rounded shadow p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">

              Historial Clínico

            </h2>

            <button
              onClick={() => setMostrarModal(true)}
              className="
                bg-green-600
                text-white
                px-4
                py-2
                rounded
                hover:bg-green-700
              "
            >
              Nueva Atención
            </button>

          </div>

          {atenciones.length === 0 ? (

            <p className="text-gray-500">

              Esta mascota aún no posee atenciones registradas.

            </p>

          ) : (

            <div className="space-y-4">

              {atenciones.map((a) => (

                <div
                  key={a.id}
                  className="
                    border
                    rounded-lg
                    p-4
                    bg-gray-50
                  "
                >

                  {/* FECHA + MOTIVO */}

                  <div className="flex justify-between mb-3">

                    <h3 className="font-bold text-lg">

                      {a.motivoConsulta}

                    </h3>

                    <span className="text-gray-500">

                      {a.fecha}

                    </span>

                  </div>

                  {/* DETALLES */}

                  <div className="grid grid-cols-2 gap-4">

                    <div>

                      <p className="text-sm text-gray-500">

                        Diagnóstico

                      </p>

                      <p>

                        {a.diagnostico || "-"}

                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">

                        Tratamiento

                      </p>

                      <p>

                        {a.tratamiento || "-"}

                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">

                        Observaciones

                      </p>

                      <p>

                        {a.observaciones || "-"}

                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">

                        Veterinario

                      </p>

                      <p>

                        {a.veterinarioUsername}

                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

      {/* ========================= */}
      {/* MODAL NUEVA ATENCION */}
      {/* ========================= */}

      {
        mostrarModal && (

          <div
            className="
              fixed
              inset-0
              bg-black
              bg-opacity-50
              flex
              items-center
              justify-center
              z-50
            "
          >

            <div
              className="
                bg-white
                rounded-lg
                p-6
                w-full
                max-w-3xl
              "
            >

              <div className="flex justify-between mb-6">

                <h2 className="text-2xl font-bold">

                  Nueva Atención

                </h2>

                <button
                  onClick={() => setMostrarModal(false)}
                  className="text-red-500 font-bold"
                >
                  X
                </button>

              </div>

              <form
                onSubmit={handleGuardarAtencion}
                className="space-y-4"
              >

                <div className="grid grid-cols-2 gap-4">

                  {/* Fecha atención */}
                  <div>

                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Fecha atención
                    </label>

                    <input
                      type="datetime-local"
                      name="fecha"
                      value={formAtencion.fecha}
                      onChange={handleChangeAtencion}
                      className="w-full border rounded p-2"
                    />

                  </div>

                  {/* Próxima visita */}
                  <div>

                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Próxima visita
                    </label>

                    <input
                      type="date"
                      name="proximaVisita"
                      value={formAtencion.proximaVisita}
                      onChange={handleChangeAtencion}
                      className="w-full border rounded p-2"
                    />

                  </div>

                </div>

                <input
                  type="text"
                  name="motivoConsulta"
                  placeholder="Motivo consulta"
                  value={formAtencion.motivoConsulta}
                  onChange={handleChangeAtencion}
                  className="border p-2 rounded w-full"
                  required
                />

                <textarea
                  name="diagnostico"
                  placeholder="Diagnóstico"
                  value={formAtencion.diagnostico}
                  onChange={handleChangeAtencion}
                  className="border p-2 rounded w-full"
                />

                <textarea
                  name="tratamiento"
                  placeholder="Tratamiento"
                  value={formAtencion.tratamiento}
                  onChange={handleChangeAtencion}
                  className="border p-2 rounded w-full"
                />

                <textarea
                  name="observaciones"
                  placeholder="Observaciones"
                  value={formAtencion.observaciones}
                  onChange={handleChangeAtencion}
                  className="border p-2 rounded w-full"
                />

                <div className="grid grid-cols-2 gap-4">

                  <input
                    type="number"
                    step="0.1"
                    name="peso"
                    placeholder="Peso"
                    value={formAtencion.peso}
                    onChange={handleChangeAtencion}
                    className="border p-2 rounded"
                  />

                  <input
                    type="number"
                    step="0.1"
                    name="temperatura"
                    placeholder="Temperatura"
                    value={formAtencion.temperatura}
                    onChange={handleChangeAtencion}
                    className="border p-2 rounded"
                  />

                </div>

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    name="requiereSeguimiento"
                    checked={formAtencion.requiereSeguimiento}
                    onChange={handleChangeAtencion}
                  />

                  Requiere seguimiento

                </label>

                <button
                  type="submit"
                  className="
                    bg-green-600
                    text-white
                    px-4
                    py-2
                    rounded
                    hover:bg-green-700
                  "
                >
                  Guardar Atención
                </button>

              </form>

            </div>

          </div>
        )
      }

    </Layout>
  );
}