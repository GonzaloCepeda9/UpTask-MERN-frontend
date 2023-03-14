import useProyectos from "../hooks/useProyectos"
import Proyecto from "../components/Proyecto"
import Alerta from "../components/Alerta"

function Proyectos() {

  const { proyectos, alerta } = useProyectos()

  const { msg } = alerta

  return (
    <>
      <h2 className="titulo-h3">Proyectos</h2>
      {msg && <Alerta alerta={alerta} />}
      <div className="bg-white text-sm font-semibold shadow mt-4 rounded">
        {proyectos.length ?
          proyectos.map(proyecto => (
            <Proyecto
              key={proyecto._id}
              proyecto={proyecto}
            />
          ))
        
        : <h2 className="titulo-h3">Aún no hay proyectos</h2>}
      </div>
    </>
  )
}

export default Proyectos