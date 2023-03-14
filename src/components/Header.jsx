import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useProyectos from "../hooks/useProyectos"
import Busqueda from "./Busqueda"

function Header() {

  const [width, setWidth] = useState(window.innerWidth);
  const [clicked, setClicked] = useState(false)
  
  const breakPoint = 768;

  useEffect(()=> {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const { handleModalBuscador, cerrarSesionProyectos } = useProyectos()
  const { cerrarSesionAuth } = useAuth()

  function handleCerrarSesion () {
    cerrarSesionAuth()
    cerrarSesionProyectos()
    localStorage.removeItem("token")
  }
  
  function handleClick () {
    setClicked(!clicked)
  }
 
  return (
    <header className="cabecera">
      <h1 className="cabecera-h1 titulo-h1">UpTask</h1>
      <button className={`cabecera-burguer-icon ${width > breakPoint ? "hidden" : ""}`} onClick={handleClick}>
        {clicked ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cabecera-svg w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cabecera-svg w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>)
        }
      </button>
      <nav className={`cabecera-nav
      ${
        width <= breakPoint && clicked ? "menu-show" :
        width <= breakPoint && !clicked ? "" :
        ""
      }`}
      >
        <div className="cabecera-ul">
          <button
            type="button"
            className="cabecera-buscador cabecera-item flex items-center gap-2 text-sm text-center font-bold uppercase text-gray-400 hover:text-sky-600
            max-[640px]:text-[12px]
            max-[640px]:p-0
            link-item"
            onClick={handleModalBuscador}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6
              max-[640px]:w-4
              max-[640px]:h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            Buscar proyecto
          </button>
          <Link to="/proyectos" className="cabecera-proyectos cabecera-item flex items-center gap-2 text-sm text-center font-bold uppercase text-gray-400 hover:text-sky-600
          max-[640px]:text-[12px]
          max-[640px]:p-0
          link-item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6
              max-[640px]:w-4
              max-[640px]:h-4"
              >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            Proyectos
          </Link>
          <Link
            type="button"
            className="cabecera-cerrar-sesion cabecera-item submit-button w-auto gap-2"
            onClick={handleCerrarSesion}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6
              max-[640px]:w-4
              max-[640px]:h-4"
              >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Cerrar sesión
          </Link>
        </div>
      </nav>
      <Busqueda />
    </header>
  )
}

export default Header