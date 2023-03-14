import useProyectos from "../hooks/useProyectos"

function Colaborador({colaborador}) {

  const { handleModalEliminarColaborador } = useProyectos()

  const { nombre, email } = colaborador

  return (
    <div className="border-b p-4 flex justify-between items-center
    max-[640px]:flex-col
    max-[640px]:gap-2
    max-[640px]:p-2
    max-[640px]:text-[12px]
    max-[640px]:text-center">
      <div>
        <p className="font-semibold">{nombre}</p>
        <p className="text-xs text-gray-400">{email}</p>
      </div>

      <div>
        <button
          className="bg-red-600 hover:bg-red-500 active:bg-red-700 text-white uppercase font-semibold  rounded-md text-[6px] py-1 px-4 sm:text-xs sm:py-2"
          onClick={()=> handleModalEliminarColaborador(colaborador)}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default Colaborador