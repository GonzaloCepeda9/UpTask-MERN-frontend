import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import formatearFecha from "../helpers/formatearFecha"
import io from "socket.io-client"

import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"

import Alerta from "../components/Alerta"

import Tarea from "../components/Tarea"
import Colaborador from "../components/Colaborador"
import ModalFormularioTarea from "../components/ModalFormularioTarea"
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"
import ModalEliminarProyecto from "../components/ModalEliminarProyecto"

let socket;

function ProyectoPage() {

  const params = useParams()

  const { alerta, obtenerProyecto, proyecto, cargando, handleModalTarea, submitTareasProyecto, eliminarTareaProyecto, editarTareaProyecto, completarTareaProyecto, handleModalEliminarProyecto } = useProyectos()
  
  const { nombre, descripcion, cliente, fechaEntrega } = proyecto

  const admin = useAdmin()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit("Abrir proyecto", params.id)
  }, [])


  // SOCKET IO => PARA ACTUALIZACIÓN EN TIEMPO REAL

  useEffect(() => {

    socket.on("Tarea agregada", tareaNueva => {
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareasProyecto(tareaNueva)
      }
    })

    socket.on("Tarea eliminada", tareaEliminada => {
      if (tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada)
      }
    })

    socket.on("Tarea editada", tareaEditada => {
      if (tareaEditada.proyecto._id === proyecto._id) {
        editarTareaProyecto(tareaEditada)
      }
    })

    socket.on("Estado cambiado", tareaCompletada => {
      if (tareaCompletada.proyecto._id === proyecto._id) {
        completarTareaProyecto(tareaCompletada)
      }
    })
  })

  if (cargando) return <h2 className="titulo-h3">Cargando...</h2>

  const { msg } = alerta

  return (
      <>
        <div className="">
          {msg && <Alerta alerta={alerta} />}
          <div className="p-8 bg-white shadow rounded-md max-[640px]:p-4">
            <div className="flex justify-around items-center max-[640px]:flex-col">
              
              {/* PROYECTO */}
              <h2 className="titulo-h2">
                {nombre}
              </h2>
              {admin && (
                <div className="w-1/2 flex justify-around">
                  <div className="rounded-md border-black gap-2 text-gray-400 hover:text-sky-700">
                    <Link
                      to={`/proyectos/editar-proyecto/${params.id}`}
                      className="flex justify-between items-center uppercase text-xs font-semibold max-[640px]:text-[12px]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1
                      max-[640px]:w-3 max-[640px]:h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                      Editar
                    </Link>
                  </div>  
                  <div className="ml-4 rounded-md border-black gap-2 text-gray-400 hover:text-sky-700">
                    <button
                      to={`/proyectos/editar-proyecto/${params.id}`}
                      onClick={handleModalEliminarProyecto}
                      className="flex justify-between items-center uppercase text-xs font-semibold max-[640px]:text-[12px]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1 max-[640px]:w-3 max-[640px]:h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
            <p className="my-2">
              <span className="uppercase text-xs max-[640px]:text-[12px] font-semibold text-gray-400 ">Descripción:</span>
              {" "}
              <span className="text-black font-semibold text-xs max-[640px]:text-[12px]">{descripcion}</span>
            </p>
            <p className="my-2">
              <span className="uppercase text-xs max-[640px]:text-[12px] font-semibold text-gray-400">Cliente:</span>
              {" "}
              <span className="text-black font-semibold text-xs max-[640px]:text-[12px]">{cliente}</span>
            </p>
            <p className="my-2">
              <span className="uppercase text-xs max-[640px]:text-[12px] font-semibold text-gray-400">Fecha de entrega:</span>
              {" "}
              <span className="text-black font-semibold text-xs max-[640px]:text-[12px] capitalize">{formatearFecha(fechaEntrega)}</span>
            </p>
          </div>

          {/* TAREAS */}
          <div>
            <div className="flex justify-between items-center my-4
            max-[640px]:flex-col"
            >
              <h3 className="titulo-h3">Tareas del proyecto</h3>
              {admin && (
                <button
                  onClick={handleModalTarea}
                  className="submit-button-icon bg-sky-500 hover:bg-sky-400 active:bg-sky-600"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 max-[640px]:w-4 max-[640px]:h-4">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                  </svg>
                  Nueva tarea
                </button>
              )}
            </div>

            <div className="bg-white shadow p-4 rounded-md">
              {proyecto.tareas?.length ?
                proyecto.tareas?.map(tarea => (
                  <Tarea
                    key={tarea._id}
                    tarea={tarea}
                  />
                )) : (
                  <p className="max-[640px]:text-[12px]">Aún no hay tareas.</p>
                )}
            </div>

            {/* COLABORADORES */}
            {admin && (
              <>
                <div className="flex justify-between items-center my-4  max-[640px]:flex-col">
                  <h3 className="titulo-h3">Colaboradores</h3>
                  <Link
                    to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                    className="submit-button-icon bg-sky-500 hover:bg-sky-400 active:bg-sky-600"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 max-[640px]:w-4 max-[640px]:h-4">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                    </svg>
                    Nuevo Colaborador
                  </Link>
                </div>
                <div className="bg-white shadow p-4 rounded-md">
                  {proyecto.colaboradores?.length ?
                    proyecto.colaboradores?.map(colaborador => (
                      <Colaborador
                        key={colaborador._id}
                        colaborador={colaborador}
                      />
                    )) : (
                      <p className="max-[640px]:text-[12px]">Aún no hay colaboradores.</p>
                    )}
                </div>
              </>
            )}

            <ModalEliminarProyecto />
            <ModalFormularioTarea />
            <ModalEliminarTarea />
            <ModalEliminarColaborador />
          </div>
        </div>
      </>
    )
}

export default ProyectoPage