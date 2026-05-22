/**
 * Página de Login
 *
 * Qué hace:
 * - Permite autenticarse contra el backend (Spring Boot + JWT)
 * - Guarda el token en localStorage
 * - Redirige al dashboard
 *
 * Mejoras agregadas:
 * ✔ Mostrar/Ocultar contraseña
 * ✔ Loading mientras se loguea
 * ✔ Manejo de errores visual
 *
 * Tecnologías:
 * - React (estado + eventos)
 * - Tailwind (UI)
 * - Fetch API (login)
 */

import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

import bgImage from "../assets/login-bg.png";
import logo from "../assets/logo.png";

export default function Login() {

  // 🔵 Estado del formulario (inputs)
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // 🔥 NUEVO: controla si se muestra o no la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // 🔥 NUEVO: controla estado de carga (loading)
  const [loading, setLoading] = useState(false);

  // 🔥 NUEVO: guarda mensaje de error
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /**
   * Maneja cambios en inputs
   * - Actualiza el estado dinámicamente
   */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Maneja el login
   *
   * Qué hace:
   * - Evita recarga
   * - Llama al backend
   * - Guarda token
   * - Redirige
   * - Maneja errores
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);   // 🔥 activa loading
    setError("");       // limpia errores anteriores

    try {
      
      await login(form); // ya guarda token internamente

      // redirige a clientes
      navigate("/clientes");

    } catch (err) {
      // 🔥 NUEVO: mostramos error elegante
      setError("Usuario o contraseña incorrectos");

    } finally {
      setLoading(false); // 🔥 desactiva loading
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-end bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      <div className="absolute inset-0 bg-white/5"></div>

      {/* 🔵 CONTENEDOR DERECHO */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center">

        {/* 🔵 CARD LOGIN */}
        <form
          onSubmit={handleSubmit}
          className="animate-fadeInUp bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[420px] border border-gray-200"
        >

          {/* 🔵 LOGO */}
          <div className="flex justify-center mb-2 overflow-hidden">
            <img
              src={logo}
              alt="VetCare Logo"
              className="w-56 md:w-64 h-auto object-contain scale-125"
            />
          </div>

          {/* 🔵 TITULO */}
          <h2 className="text-xl font-medium mb-3 text-center text-gray-600">
            Iniciar sesión
          </h2>

          {/* 🔥 NUEVO: MENSAJE DE ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {error}
            </p>
          )}

          {/* 🔵 INPUT USUARIO */}
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={form.username}
            onChange={handleChange}
            className="w-full bg-white/70 border border-gray-300 p-3 rounded-lg mb-4 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 
                       transition duration-200"
          />

          {/* 🔥 INPUT PASSWORD CON BOTÓN VER/OCULTAR */}
          <div className="relative mb-4">

            <input
              type={showPassword ? "text" : "password"} // 🔥 cambia dinámicamente
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-white/70 border border-gray-300 p-3 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         transition duration-200"
            />

            {/* 🔥 BOTÓN VER / OCULTAR */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 text-sm"
            >
              {showPassword ? "Ocultar" : "Ver"}
            </button>

          </div>

          {/* 🔥 BOTÓN CON LOADING */}
          <button
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg 
                       transition duration-300 transform hover:scale-[1.02]
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </form>
      </div>
    </div>
  );
}