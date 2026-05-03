/**
 * Página de Login
 *
 * Qué hace:
 * - captura username y password
 * - llama al backend
 * - guarda token
 * - redirige al dashboard
 *
 * Tecnologías:
 * - React (estado)
 * - Tailwind (UI)
 */

import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form.username, form.password);

      //  redirige
      navigate("/dashboard");
    } catch (err) {
      alert("Login incorrecto");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Ingresar
        </button>

      </form>
    </div>
  );
}