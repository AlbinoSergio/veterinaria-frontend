import { Link, useNavigate } from "react-router-dom"; 

// funciones de auth
import { getUser, logout } from "../api/auth";

export default function Navbar() {

  const user = getUser();

  const navigate = useNavigate();

  /**
   * Logout completo
   * - borra token
   * - redirige al login
   */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">

      {/* 🔵 Nombre app */}
      <h1 className="text-lg font-bold">🐾 Veterinaria</h1>

      <div className="space-x-6 flex items-center">
        
        <Link to="/clientes" className="hover:text-gray-200">
          Clientes
        </Link>

        <Link to="/mascotas" className="hover:text-gray-200">
          Mascotas
        </Link>

        <Link to="/dashboard" className="hover:text-gray-200">
          Dashboard
        </Link>

        <Link to="/reportes" className="hover:text-gray-200">
          Reportes
        </Link>

        {/*  MODIFICADO: mostramos SOLO usuario (sin rol) */}
        {user && (
          <span className="ml-4 font-semibold">
            Usuario: {user.sub}
          </span>
        )}

        {/*  Botón salir */}
        {user && (
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Salir
          </button>
        )}

      </div>
    </nav>
  );
}

