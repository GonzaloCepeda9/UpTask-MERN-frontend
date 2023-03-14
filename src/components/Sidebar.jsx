import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function Sidebar() {

  const { auth } = useAuth()

  return (
    <aside className="md:w-40 lg:w-80 px-4 py-8
    max-[640px]:py-2
    max-[640px]:text-sm"
    >
      <h2 className="titulo-h3">
        Hola <span className="text-sky-600">{auth.nombre}</span>!
      </h2>
      <Link
        to="crear-proyecto"
        className="submit-button"
      >
        Nuevo Proyecto
      </Link>  
    </aside>
  )
}

export default Sidebar