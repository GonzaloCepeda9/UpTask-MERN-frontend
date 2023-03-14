import FormularioProyecto from "../components/FormularioProyecto"

function NuevoProyecto() {
  return (
    <>
      <h2 className="titulo-h3">Crear Proyecto</h2>
      <div className="flex justify-center max-[640px]:mt-2">
        <FormularioProyecto />
      </div>
    </>
  )
}

export default NuevoProyecto