import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { getTopClientes } from "../api/reportes";

export default function Reportes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getTopClientes().then(setClientes);
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Top Clientes</h1>

      <div className="bg-white rounded shadow p-4">
        {clientes.map((c, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <span>{c.nombreCliente}</span>
            <span className="font-bold">${c.totalGastado}</span>
          </div>
        ))}
      </div>
    </Layout>
  );
}