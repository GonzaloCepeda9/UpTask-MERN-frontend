import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

function ConfirmarUsuario() {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {

    const confirmarCuenta = async () => {
      
      try {
        const { data } = await clienteAxios.get(`/usuarios/confirmar/${token}`)
        
        console.log(data.msg)

        setAlerta({
          msg: data.msg,
          error: false
        })

        setCuentaConfirmada(true)
        
      } catch (error) {

        console.log(error.response.data.msg)

        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }

    confirmarCuenta()
  }, [])

  const { msg } = alerta;

  return (
    <>
      <h1 className="titulo-h1">Confirma tu cuenta y comienza a administrar tus <span className="text-slate-700">proyectos</span></h1>
      <div>
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            to="/"
            className="link-text"
            >
            Iniciar sesión
          </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarUsuario