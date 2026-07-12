import { useState } from 'react'
import Header from './components/Header'
import ServiceCard from './components/ServiceCard'
import NewServiceForm from './components/NewServiceForm'
import type { ServiceOrder } from './types/ServiceOrder'

function App() {
  const [orders, setOrders] = useState<ServiceOrder[]>([])

  function handleAddOrder(newOrder: ServiceOrder) {
    setOrders([...orders, newOrder])
  }

  const statusColumns = [
    { key: 'aberto', title: 'Aberto' },
    { key: 'em_andamento', title: 'Em Andamento' },
    { key: 'finalizado', title: 'Finalizado' },
  ] as const

  return (
 <div className="min-h-screen bg-background">
    <Header />

    <main className="max-w-6xl mx-auto p-6">
      <NewServiceForm onAddOrder={handleAddOrder} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statusColumns.map((column) => (
          <div key={column.key}>
            <h2 className="font-bold text-gray-600 mb-3">{column.title}</h2>
            <div className="space-y-3">
              {orders
                .filter((order) => order.status === column.key)
                .map((order) => (
                  <ServiceCard key={order.id} order={order} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
  )
}

export default App