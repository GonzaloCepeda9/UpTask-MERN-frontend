import { useEffect } from "react"
import { useParams } from "react-router-dom"
import FormularioProyecto from "../components/FormularioProyecto"
import useProyectos from "../hooks/useProyectos"

function EditarProyecto() {

  const params = useParams()

  const { obtenerProyecto, proyecto, cargando } = useProyectos()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  if (cargando) return <h2 className="titulo-h3">Cargando...</h2>

  return (
    <>
      <h2 className="titulo-h3">Editar proyecto: {proyecto.nombre}</h2>
      <div className="flex justify-center max-[640px]:mt-2">
        <FormularioProyecto />
      </div>
    </>
  )
}

export default EditarProyecto