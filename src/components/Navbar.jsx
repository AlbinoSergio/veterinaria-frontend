import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <h1 className="text-lg font-bold">🐾 Veterinaria</h1>

      <div className="space-x-6">
        <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
        <Link to="/clientes" className="hover:text-gray-200">Clientes</Link>
        <Link to="/reportes" className="hover:text-gray-200">Reportes</Link>
      </div>
    </nav>
  );
}