import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Nav from '../components/Nav'

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Nav />
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default RootLayout