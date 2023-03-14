import { useState} from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

function RecuperarPassword() {

  const [email, setEmail] = useState("")

  const [alerta, setAlerta] = useState({})

  async function handleSubmit (e) {
    e.preventDefault()

    if (email === "") {
      setAlerta({
        msg: "El email es obligatorio.",
        error: true
      })
      return
    }
    
    try {
      const { data } = await clienteAxios.post(`/usuarios/recuperar-password`, {email})
      console.log(data)
      setAlerta({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className="titulo-h1">Recupera tu acceso y no pierdas tus <span className="text-slate-700">proyectos</span></h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-8 bg-white shadow rounded-lg py-6 px-8
        max-[640px]:my-4
        max-[640px]:p-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-6
            max-[640px]:mb-4">
          <label
            htmlFor="email"
            className="label-text"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro"
            className="input-text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Enviar instrucciones"
          className="submit-button"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/registrar"
          className="link-text"
        >
          ¿No tienes una cuenta? Regístrate.
        </Link>
        <Link
          to="/"
          className="link-text"
        >
          ¿Ya tienes una cuenta? Inicia sesión.
        </Link>
      </nav>
    </>
  )
}

export default RecuperarPassword