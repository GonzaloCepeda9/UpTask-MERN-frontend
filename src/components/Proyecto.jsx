import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function Proyecto({proyecto}) {

  const { auth } = useAuth()

  const { nombre, _id, cliente, creador } = proyecto

  return (
    <div className="border-b p-4">
      <div className="flex justify-between items-center text-center gap-2 max-[460px]:flex-col mb-2">
        <p className="text-xs text-gray-800">
          {nombre}
        </p>

        <button className={`w-auto text-center text-[12px] text-white uppercase rounded-lg px-2 cursor-auto ${auth._id !== creador ? "bg-green-500" : "bg-violet-700"}`}>
            {auth._id !== creador ? "Colaborador" : "Creador"}
        </button>
      </div>

      <div className="flex justify-between items-center text-center gap-2 max-[460px]:flex-col">
        <p className="text-xs text-gray-400">
          Cliente: {cliente}
        </p>

        <Link
          to={`${_id}`}
          className="text-gray-400 uppercase italic text-[12px] font-bold hover:text-gray-800"
          >
          {"Ver proyecto"}
        </Link>
      </div>
    </div>
  )
}

export default Proyecto