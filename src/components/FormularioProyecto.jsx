import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Alerta from "./Alerta"
import useProyectos from "../hooks/useProyectos"

function FormularioProyecto() {

  const [id, setId] = useState(null)
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [fechaEntrega, setFechaEntrega] = useState("")
  const [cliente, setCliente] = useState("")

  const params = useParams()

  const { alerta, mostrarAlerta, enviarProyecto, proyecto } = useProyectos()

  useEffect(() => {
    if (params.id) {
      setId(proyecto._id)
      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      setFechaEntrega(proyecto.fechaEntrega?.split("T")[0])
      setCliente(proyecto.cliente)
    }
  }, [params])

  async function handleSubmit(e) {
    e.preventDefault()

    if([nombre, descripcion, fechaEntrega, cliente].includes("")) {

      mostrarAlerta({
        msg: "Todos los campos son obligatorios.",
        error: true
      })

      return
    }

    await enviarProyecto({id, nombre, descripcion, fechaEntrega, cliente})
    
    setId(null)
    setNombre("")
    setDescripcion("")
    setFechaEntrega("")
    setCliente("")

  }

  const { msg } = alerta;

  return (
    <form
      className="my-8 bg-white shadow rounded-lg pb-6 p-8
      max-[640px]:p-4
      max-[640px]:m-0"
      onSubmit={handleSubmit}
    >

      {msg && <Alerta alerta={alerta} />}

      <div className="mb-4
        max-[640px]:mb-2">
        <label htmlFor="nombre" className="label-text">
          Nombre Proyecto
        </label>
        <input
          id="nombre"
          type="text"
          className="input-text"
          placeholder="Nombre del proyecto"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-4
        max-[640px]:mb-2">
        <label htmlFor="descripcion" className="label-text">
          Descripción
        </label>
        <textarea
          id="descripcion"
          type="text"
          className="input-text"
          placeholder="Descripción del proyecto"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div>

      <div className="mb-4
        max-[640px]:mb-2">
        <label htmlFor="fecha-entrega" className="label-text">
          Fecha de entrega
        </label>
        <input
          id="fecha-entrega"
          type="date"
          className="input-text"
          value={fechaEntrega}
          onChange={e => setFechaEntrega(e.target.value)}
        />
      </div>

      <div className="mb-4
        max-[640px]:mb-2">
        <label htmlFor="cliente" className="label-text">
          Nombre cliente
        </label>
        <input
          id="cliente"
          type="text"
          className="input-text"
          placeholder="Nombre del cliente"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={id ? "Editar proyecto" : "Crear proyecto"}
        className="submit-button"
      />

    </form>
  )
}

export default FormularioProyecto