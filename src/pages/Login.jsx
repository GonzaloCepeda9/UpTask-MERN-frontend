import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"


function Login() {

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ alerta, setAlerta ] = useState({})

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  async function handleSubmit (e) {
    e.preventDefault()

    if([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios.",
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/login`, { email, password })
      localStorage.setItem("token", data.token)
      setAuth(data)
      navigate("/proyectos")
    } catch (error) {
      console.log(error)
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className="titulo-h1">Inicia sesión y administra tus <span className="text-slate-700">proyectos</span></h1>

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
            placeholder="Contraseña"
            className="input-text"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="submit-button"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="registrar"
          className="link-text"
        >
          ¿No tienes una cuenta? Regístrate.
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

export default Login