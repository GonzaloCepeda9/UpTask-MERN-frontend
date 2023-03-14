import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"

function NuevoColaborador() {

  const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta } = useProyectos()
  const params = useParams()

  useEffect(()=> {
    obtenerProyecto(params.id)
  }, [])

  if (!proyecto._id) return <Alerta alerta={alerta} />

  return (
    <>
      <h2 className="titulo-h3">Añadir colaborador/a al proyecto "{proyecto.nombre}"</h2>

      <FormularioColaborador />

      <div>
        {cargando ? <h2 className="titulo-h3">Cargando...</h2> : colaborador?._id && (
          <div className="bg-white my-8 py-8 px-4 xl:w-3/4 rounded-md shadow">
            <h2 className="titulo-h3">Resultado: </h2>
            <div className="flex justify-between items-center gap-2">
              <p className="max-[640px]:text-xs">{colaborador.nombre}</p>
              <button
                onClick={()=> agregarColaborador({
                  email: colaborador.email
                })}
                className="submit-button-icon bg-green-600 hover:bg-green-500 active:bg-green-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 max-[640px]:w-4 max-[640px]:h-4">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                </svg>
                Agregar al proyecto
              </button>
            </div>
          </div>
        )}
        <nav className="lg:flex lg:justify-between xl:w-3/4">
          <Link
            to={`/proyectos/${proyecto._id}`}
            className="link-text"
          >
            {"Volver al proyecto >>"}
          </Link>
        </nav>
      </div>
    </>
  )
}

export default NuevoColaborador