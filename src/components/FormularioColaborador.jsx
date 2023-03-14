import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"

function FormularioColaborador() {

  const [email, setEmail] = useState("")

  const { mostrarAlerta, alerta, submitColaborador } = useProyectos()

  function handleSubmit (e) {
    e.preventDefault()

    if (email === "") {
      mostrarAlerta({
        msg: "El email es obligatorio",
        error: true
      })
      return
    }

    submitColaborador(email)
  }

  const { msg } = alerta

  return (
    <form
      className="bg-white py-8 px-4 xl:w-3/4 rounded-md shadow"
      action=""
      onSubmit={handleSubmit}
    >

      {msg && <Alerta alerta={alerta} />}

      <div className="mb-4">
        <label
          htmlFor="email"
          className="label-text"
        >
            Email colaborador
          </label>
        <input
          className="input-text"
          id="email"
          type="email"
          placeholder="Email del usuario"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className="submit-button"
        value={"Buscar colaborador"}
      />
    </form>
  )
}

export default FormularioColaborador