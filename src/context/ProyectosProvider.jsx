import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios"
import io from "socket.io-client"

let socket;

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {

  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);

  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState({});
  const [tarea, setTarea] = useState({});
  const [colaborador, setColaborador] = useState({});
  const [buscador, setBuscador] = useState(false);

  const [modalEliminarProyecto, setModalEliminarProyecto] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem("token");
        if(!token){
          return
        }

        const config = {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clienteAxios("/proyectos", config);
        setProyectos(data)
        
      } catch (error) {
        console.log(error)
      }
    }
    obtenerProyectos()
  }, [auth])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
  }, [])
  

  function mostrarAlerta (alerta) {
    setAlerta(alerta)
    setTimeout(() => {
      setAlerta({})
    }, 2000);
  }

  async function enviarProyecto (proyecto) {

    if (proyecto.id) {
      await editarProyecto(proyecto)
    } else {
      await crearProyecto(proyecto)
    }
    
  }

  async function crearProyecto (proyecto) {
    try {
      const token = localStorage.getItem("token")

      if(!token) {
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post("/proyectos", proyecto, config)
      setProyectos([...proyectos, data])
      mostrarAlerta({
        msg: "Proyecto creado correctamente.",
        error: false
      })

      setTimeout(() => {
        navigate("/proyectos")
      }, 2000)

    } catch (error) {
      console.log(error)
    }

  }

  async function editarProyecto (proyecto) {
    
    try {
      const token = localStorage.getItem("token")

      if(!token) {
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)

      const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
      setProyectos(proyectosActualizados)

      mostrarAlerta({
        msg: "Proyecto actualizado correctamente.",
        error: false
      })

      setTimeout(() => {
        navigate("/proyectos")
      }, 2000)

    } catch (error) {
      console.log(error)
    }
  }

  async function obtenerProyecto (id) {

    setCargando(true)

    try {
      const token = localStorage.getItem("token")

      if(!token) {
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      
      const { data } = await clienteAxios(`/proyectos/${id}`, config)
      setProyecto(data)

    } catch (error) {
      navigate("/proyectos")
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

    setCargando(false)
  }

  async function eliminarProyecto (id) {

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)

      const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)

      setProyectos(proyectosActualizados)

      mostrarAlerta({
        msg: data.msg,
        error: false
      })

      setModalEliminarProyecto(!modalEliminarProyecto)
      navigate("/proyectos")
        
    } catch (error) {
      console.log(error)
    }

  }
  
  async function handleModalEliminarProyecto () {
    setModalEliminarProyecto(!modalEliminarProyecto)
  }

  async function handleModalTarea () {
    setModalFormularioTarea(!modalFormularioTarea)
    setTarea({})
  }

  async function submitTarea (tarea) {

    if (tarea.id) {
      await editarTarea(tarea)
    } else {
      await crearTarea(tarea)
    }
  }

  async function crearTarea (tarea) {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post("/tareas", tarea, config)

      mostrarAlerta({
        msg: "Tarea creada con éxito.",
        error: false
      })
      
      setModalFormularioTarea(false)

      // SOCKET IO
      socket.emit("Nueva tarea", data)

    } catch (error) {
      console.log(error)
    }
  }

  async function editarTarea (tarea) {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
      
      mostrarAlerta({
        msg: data.msg,
        error: false
      })

      setModalFormularioTarea(false)

      socket.emit("Editar tarea", data)

    } catch (error) {
      console.log(error)
    }
  }

  async function handleModalEditarTarea (tarea) {
    setTarea(tarea)
    setModalFormularioTarea(true)
  }

  async function eliminarTarea () {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)

      setModalEliminarTarea(false)
      setTarea({})
      
      socket.emit("Eliminar tarea", tarea)
      
      mostrarAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      
    }
  }

  async function handleModalEliminarTarea (tarea) {
    setTarea(tarea)
    setModalEliminarTarea(!modalEliminarTarea)
  }

  async function submitColaborador (email) {

    setCargando(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post("/proyectos/colaboradores", {email}, config)
      setColaborador(data)
      
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
    setCargando(false)
  }

  async function agregarColaborador (email) {

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)
      console.log(data)
      mostrarAlerta({
        msg: data.msg,
        error: false
      })
      setColaborador({})

    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  async function eliminarColaborador() {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config)
      console.log(colaborador)
      
      const proyectoActualizado = {...proyecto, }

      proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)

      setProyecto(proyectoActualizado)

      mostrarAlerta({
        msg: data.msg,
        error: false
      })

      setColaborador({})
      setModalEliminarColaborador(false)

    } catch (error) {
      console.log(error)
    }
  }

  async function handleModalEliminarColaborador (colaborador) {
    setModalEliminarColaborador(!modalEliminarColaborador)
    setColaborador(colaborador)
  }

  async function completarTarea (id) {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)

      setTarea({})
      mostrarAlerta({})

      // SOCKET IO
      socket.emit("Cambiar estado", data)

    } catch (error) {
      console.log(error)
    }
  }

  function handleModalBuscador () {
    setBuscador(!buscador)
  }

  // SOCKET IO => FUNCIONES

    // AGREGAR TAREA Y SINCRONIZAR STATE

  function submitTareasProyecto (tareaNueva) {
    const proyectoActualizado = {...proyecto}
    proyectoActualizado.tareas = [...proyectoActualizado.tareas, tareaNueva]
    setProyecto(proyectoActualizado)
  } 

    // ELIMINAR TAREA Y SINCRONIZAR STATE

  function eliminarTareaProyecto (tarea) {
    const proyectoActualizado = {...proyecto}
    proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id)
    setProyecto(proyectoActualizado)
  }

    // EDITAR TAREA Y SINCRONIZAR STATE
  function editarTareaProyecto (tarea) {
    const proyectoActualizado = {...proyecto}
    proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === tarea._id ? tarea : tareaState)
    setProyecto(proyectoActualizado)
  }

    // CAMBIAR ESTADO DE TAREA Y SINCRONIZAR STATE
  function completarTareaProyecto (tarea) {          
    const proyectoActualizado = {...proyecto}
    proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
    setProyecto(proyectoActualizado)
  }
  
  // CERRAR SESIÓN

  function cerrarSesionProyectos () {
    setProyectos([])
    setProyecto({})
    mostrarAlerta({})
  }

  return (
    <ProyectosContext.Provider 
      value={{
        proyectos,
        setProyectos,
        proyecto,

        enviarProyecto,
        obtenerProyecto,

        eliminarProyecto,
        handleModalEliminarProyecto,
        modalEliminarProyecto,
        
        mostrarAlerta,
        alerta,
        cargando,
        cerrarSesionProyectos,

        submitTarea,
        tarea,
        completarTarea,

        handleModalTarea,
        handleModalEditarTarea,
        modalFormularioTarea,

        eliminarTarea,
        handleModalEliminarTarea,
        modalEliminarTarea,

        submitColaborador,
        colaborador,
        agregarColaborador,

        eliminarColaborador,
        handleModalEliminarColaborador,
        modalEliminarColaborador,

        handleModalBuscador,
        buscador,

        // SOCKET IO
        submitTareasProyecto,
        eliminarTareaProyecto,
        editarTareaProyecto,
        completarTareaProyecto,

      }}
    >
      {children}
    </ProyectosContext.Provider>
  )

}

export {
  ProyectosProvider
}

export default ProyectosContext;