import { useEffect, useState } from 'react'
import api from '../services/api'
import type { Client } from '../types/Client'
import type { ServiceOrder, ServiceOrderStatus } from '../types/ServiceOrder'

const statusColumns: { key: ServiceOrderStatus; title: string }[] = [
  { key: 'open', title: 'Aberto' },
  { key: 'in_progress', title: 'Em Andamento' },
  { key: 'done', title: 'Finalizado' },
]

function DashboardPage() {
  const [orders, setOrders] = useState<ServiceOrder[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.get<ServiceOrder[]>('/service-orders'), api.get<Client[]>('/clients')])
      .then(([ordersResponse, clientsResponse]) => {
        setOrders(ordersResponse.data)
        setClients(clientsResponse.data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  function clientName(id: string) {
    return clients.find((client) => client.id === id)?.name ?? 'Cliente desconhecido'
  }

  if (isLoading) {
    return <p className="text-gray-400">Carregando ordens de serviço...</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statusColumns.map((column) => (
        <div key={column.key}>
          <h2 className="font-bold text-gray-600 mb-3">{column.title}</h2>
          <div className="space-y-3">
            {orders
              .filter((order) => order.status === column.key)
              .map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
                >
                  <h3 className="font-bold text-gray-800">{clientName(order.clientId)}</h3>
                  <p className="text-gray-500 text-sm">
                    <span className="font-medium text-gray-700">Aparelho:</span> {order.device}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-medium text-gray-700">Defeito:</span> {order.issue}
                  </p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardPage