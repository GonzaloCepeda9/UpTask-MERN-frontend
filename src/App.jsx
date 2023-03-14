import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider"
import { ProyectosProvider } from "./context/ProyectosProvider"

import AuthLayout from "./layout/AuthLayout"
import RutaProtegida from "./layout/RutaProtegida"

import Proyectos from "./pages/Proyectos"
import NuevoProyecto from "./pages/NuevoProyecto"

import Login from "./pages/Login"
import Registrar from "./pages/Registrar"
import RecuperarPassword from "./pages/RecuperarPassword"
import NuevoPassword from "./pages/NuevoPassword"
import ConfirmarUsuario from "./pages/ConfirmarUsuario"
import ProyectoPage from "./pages/ProyectoPage"
import EditarProyecto from "./pages/EditarProyecto"
import NuevoColaborador from "./pages/NuevoColaborador"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          {/* ÁREA PÚBLICA */}

          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="confirmar/:token" element={<ConfirmarUsuario />} />
              <Route path="recuperar-password" element={<RecuperarPassword />} />
              <Route path="recuperar-password/:token" element={<NuevoPassword />} />
            </Route>
          

          {/* ÁREA PRIVADA */}
            {/* RutaProtegida va a tener la lógica para proteger el resto de componentes que estén dentro. */}

            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path="crear-proyecto" element={<NuevoProyecto />} />
              <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />} />
              <Route path=":id" element={<ProyectoPage />} />
              <Route path="editar-proyecto/:id" element={<EditarProyecto />} />
            </Route>

          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
