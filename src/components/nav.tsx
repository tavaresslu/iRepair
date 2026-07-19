import { NavLink } from 'react-router-dom'

function Nav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-3 rounded-xl text-sm font-semibold transition ${
      isActive ? 'bg-primary-dark text-white' : 'text-gray-500 hover:bg-primary'
    }`

  return (
    <nav className="w-56 shrink-0 border-r border-gray-200 px-4 py-8 flex flex-col gap-2">
      <NavLink to="/" end className={linkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/clients" className={linkClass}>
        Clientes
      </NavLink>
      <NavLink to="/service-orders" className={linkClass}>
        Ordens de Serviço
      </NavLink>
    </nav>
  )
}

export default Nav