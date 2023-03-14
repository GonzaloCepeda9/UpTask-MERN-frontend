import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

function NuevoPassword() {

  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState("")
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/usuarios/recuperar-password/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  }, [])

  async function handleSubmit (e) {
    e.preventDefault()

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener al menos 6 caracteres.",
        error: true
      })
      return
    }
    
    try {  
      const { data } = await clienteAxios.post(`/usuarios/recuperar-password/${token}`, {password})
      
      console.log(data)
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
      setPassword("")
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
      <h1 className="text-sky-600 font-black text-4xl capitalize max-[640px]:text-lg max-[640px]:text-center">Reestablece tu contraseña y no pierdas tus <span className="text-slate-700">proyectos</span></h1>
      
      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          className="my-8 bg-white shadow rounded-lg py-6 px-8
          max-[640px]:my-4
          max-[640px]:p-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-6
            max-[640px]:mb-4">
            <label
              htmlFor="password"
              className="label-text"
            >
              Nuevo password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nuevo password"
              className="input-text"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Reestablecer password"
            className="submit-button"
          />
        </form>
      )}

      {passwordModificado && (
        <Link
          to="/"
          className="link-text"
          >
          Iniciar sesión
        </Link>
      )}
    </>
  )
}

export default NuevoPassword