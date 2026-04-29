// Importamos herramientas de navegación de React Router
// Esto permite tener múltiples "pantallas" en nuestra app
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importamos nuestras páginas (componentes React)
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Reportes from "./pages/Reportes";

/**
 * Este archivo es el "punto de entrada visual" de la app
 * Aquí definimos qué pantalla se muestra según la URL
 *
 * Tecnologías:
 * - React (componentes)
 * - React Router (navegación)
 */
function App() {
  return (
    // BrowserRouter habilita la navegación tipo SPA (Single Page App)
    <BrowserRouter>

      {/* Routes contiene todas las rutas posibles */}
      <Routes>

        {/* Ruta raíz → muestra Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard principal */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Página de clientes */}
        <Route path="/clientes" element={<Clientes />} />

        {/* Página de reportes */}
        <Route path="/reportes" element={<Reportes />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;