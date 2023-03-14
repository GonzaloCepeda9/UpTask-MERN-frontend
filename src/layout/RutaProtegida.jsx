import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

function RutaProtegida() {

  const { auth, cargando } = useAuth()

  if (cargando) return <h2 className="titulo-h3">Cargando...</h2>

  return (
    <>
      {auth._id ? (
        <div className="bg-gray-100">
          <Header/>
          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <main className="p-8 flex-1 max-[640px]:p-4">
              <Outlet />
            </main>
          </div>
        </div>
        ) : 
        <Navigate to="/" />}
    </>
  )
}

export default RutaProtegida