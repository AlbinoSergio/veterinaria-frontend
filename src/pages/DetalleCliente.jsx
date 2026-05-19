import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Layout from "../components/Layout";

import { getClienteById } from "../api/clientes";
import { getMascotasPorCliente } from "../api/mascotas";

export default function DetalleCliente() {

  //  obtenemos ID desde URL
  const { id } = useParams();

  //  estado cliente
  const [cliente, setCliente] = useState(null);

  const [mascotas, setMascotas] = useState([]);

    /**
     * Cargar cliente
     */
    useEffect(() => {

  const cargarCliente = async () => {

        const data = await getClienteById(id);

        setCliente(data);
        
        const mascotasData = await getMascotasPorCliente(id);
        
        setMascotas(mascotasData);
    };

    cargarCliente();

    }, [id]);

  //  loading inicial
  if (!cliente) {

    return (
      <Layout>
        <p>Cargando cliente...</p>
      </Layout>
    );
  }

  return (
    <Layout>

      {/*  CABECERA */}
      <div className="bg-white rounded shadow p-6 mb-6">

        <h1 className="text-3xl font-bold mb-4">

          Cliente {cliente.codigo}

        </h1>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-gray-500">Apellido</p>
            <p className="font-semibold">
              {cliente.apellidoPrincipal}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Teléfono</p>
            <p className="font-semibold">
              {cliente.telefono}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-semibold">
              {cliente.email}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Dirección</p>
            <p className="font-semibold">
              {cliente.direccion}
            </p>
          </div>

        </div>

      </div>

      {/*  MASCOTAS */}
      <div className="bg-white rounded shadow p-6 mb-6">

        <h2 className="text-2xl font-bold mb-4">
          Mascotas
        </h2>

        <div className="space-y-3">

          {mascotas.length === 0 ? (

            <p className="text-gray-500">
              Este cliente no posee mascotas asociadas.
            </p>

          ) : (

            mascotas.map((m) => (

              <div
                key={m.id}
                className="border rounded-lg p-4 bg-gray-50 hover:bg-blue-50 transition duration-200"
              >
                <div className="grid md:grid-cols-4 gap-4">

                  <div>
                    <p className="text-sm text-gray-500">Nro Mascota</p>
                    <p className="font-semibold">{m.codigo}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Nombre</p>
                    <p className="font-semibold">{m.alias}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Especie</p>
                    <p className="font-semibold">{m.especie}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Raza</p>
                    <p className="font-semibold">{m.raza}</p>
                  </div>

                </div>
              </div>

            ))

          )}

        </div>

      </div>

      {/*  FAMILIARES */}
      <div className="bg-white rounded shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          Grupo Familiar
        </h2>

        <p className="text-gray-500">
          Próximamente mostraremos familiares asociados.
        </p>

      </div>

    </Layout>
  );
}