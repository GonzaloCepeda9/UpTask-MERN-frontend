function Alerta({ alerta }) {
  return (
    <div className={`${alerta.error ? "from-red-400 to-red-600" : "from-emerald-400 to-emerald-600"} bg-gradient-to-br text-center text-white font-bold rounded uppercase text-xs my-4 p-2
    max-[640px]:text-[8px]
    max-[640px]:my-2
    max-[640px]:p-1`}>
      {alerta.msg}
    </div>
  )
}

export default Alerta