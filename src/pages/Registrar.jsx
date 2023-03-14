import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

function Registrar() {

  const [ nombre, setNombre] = useState("");
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [ repetirPassword, setRepetirPassword] = useState("");

  const [ alerta, setAlerta] = useState({})

  async function handleSubmit (e) {
    e.preventDefault()

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "Los passwords no son iguales",
        error: true
      })  
      return      
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener al menos 6 carácteres",
        error: true
      })  
      return  
    }

    setAlerta("")

    // CREAR USUARIO EN LA API

    try {
      const { data } = await clienteAxios.post(`/usuarios`, {nombre, email, password})

      setAlerta({
        msg: data.msg,
        error: false
      })
      
      setNombre("")
      setEmail("")
      setPassword("")
      setRepetirPassword("")

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
      <h1 className="titulo-h1">Crea tu cuenta y administra tus <span className="text-slate-700">proyectos</span></h1>
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
            htmlFor="nombre"
            className="label-text"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Escribe tu nombre"
            className="input-text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            />
        </div>
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
            placeholder="Escribe tu email"
            className="input-text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6
            max-[640px]:mb-4">
          <label
            htmlFor="password"
            className="label-text"
            >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Escribe tu contraseña"
            className="input-text"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
        </div>
        <div className="mb-6
            max-[640px]:mb-4">
          <label
            htmlFor="repetir-password"
            className="label-text"
            >
            Repetir password
          </label>
          <input
            id="repetir-password"
            type="password"
            placeholder="Repite tu contraseña"
            className="input-text"
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
            />
        </div>
        <input
          type="submit"
          value="Registrar Cuenta"
          className="submit-button"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="link-text"
        >
          ¿Ya tienes una cuenta? Inicia sesión.
        </Link>
        <Link
          to="/recuperar-password"
          className="link-text"
        >
          Olvidé mi contraseña.
        </Link>
      </nav>
    </>
  )
}

export default Registrar