import formatearFecha from "../helpers/formatearFecha";
import useAdmin from "../hooks/useAdmin";
import useProyectos from "../hooks/useProyectos";

function Tarea({tarea}) {

  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()

  const admin = useAdmin()

  const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tarea;


  return (
    <div className="border-b p-4 flex-col justify-between items-center">
      <div className="flex w-full gap-2 mb-4 max-[640px]:flex-col text-center">
        <p className="text-sm font-bold text-gray-600">{nombre}</p>
        <div className={`py-1 px-2 mx-2 rounded-lg text-[12px] font-semibold text-white ${estado ? "bg-green-500" : "bg-gray-300"}
        max-[500px]:text-[8px]
        max-[500px]:m-0`
        }>
          {estado === false ? "Tarea pendiente" : `Completada por: ${tarea.completado.nombre}`}
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 mb-4">
        <p className="text-xs mb-1 text-gray-400">
          <span className="text-gray-500 font-semibold">• Descripción: </span>
          {descripcion}
        </p>
        <p className="text-xs mb-1 text-gray-400">
          <span className="text-gray-500 font-semibold">• Prioridad: </span>
          {prioridad}
        </p>
        <p className="text-xs mb-1 text-gray-400">
          <span className="text-gray-500 font-semibold">• Fecha de entrega: </span>
          {formatearFecha(fechaEntrega)}
        </p>
      </div>
      <div className="flex flex-row justify-evenly
      max-[500px]:flex-col
      max-[500px]:justify-center
      max-[500px]:items-center
      max-[500px]:gap-2
      ">
        <button
          className={`${estado ? "bg-green-600 hover:bg-green-500 active:bg-green-700" : "bg-gray-400 hover:bg-gray-300 active:bg-gray-500"} w-24 text-[6px] py-1 px-1 sm:text-xs sm:py-2 sm:px-2 text-white uppercase font-semibold text-xs rounded-md
          max-[640px]:text-[12px]`}
          onClick={()=> completarTarea(_id)}
        >
          {estado ? "Completada" : "Incompleta"}
        </button>

        {admin && (
          <>
            <button
            className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 w-24 text-[6px] py-1 px-1 sm:text-xs sm:py-2 sm:px-2 text-white uppercase font-semibold text-xs rounded-md
            max-[640px]:text-[12px]"
            onClick={()=> handleModalEditarTarea(tarea)}
            >
            Editar
            </button>

            <button
            className="bg-red-600 hover:bg-red-500 active:bg-red-700 w-24 text-[6px] py-1 px-1 sm:text-xs sm:py-2 sm:px-2 text-white uppercase font-semibold text-xs rounded-md
            max-[640px]:text-[12px]"
            onClick={()=> handleModalEliminarTarea(tarea)}
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Tarea