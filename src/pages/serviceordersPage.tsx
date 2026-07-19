import { useEffect, useState } from 'react'
import api from '../services/api'
import type { Client } from '../types/Client'
import type { NewServiceOrder, ServiceOrder, ServiceOrderStatus } from '../types/ServiceOrder'

const statusColumns: { key: ServiceOrderStatus; title: string }[] = [
  { key: 'open', title: 'Aberto' },
  { key: 'in_progress', title: 'Em Andamento' },
  { key: 'done', title: 'Finalizado' },
]

function ServiceOrdersPage() {
  const [orders, setOrders] = useState<ServiceOrder[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [clientId, setClientId] = useState('')
  const [device, setDevice] = useState('')
  const [issue, setIssue] = useState('')

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.get<ServiceOrder[]>('/service-orders'), api.get<Client[]>('/clients')])
      .then(([ordersResponse, clientsResponse]) => {
        setOrders(ordersResponse.data)
        setClients(clientsResponse.data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Botão clicado! Cliente: ' + clientId + ' | Aparelho: ' + device + ' | Defeito: ' + issue)

    if (!clientId || !device || !issue) {
      alert('Faltou preencher algum campo')
      return
    }
 const newOrder: NewServiceOrder = {
      clientId: Number(clientId),
      device,
      issue,
      status: 'open',
    }

    api
      .post<ServiceOrder>('/service-orders', newOrder)
      .then((response) => {
        alert('Deu certo!')
        setOrders([...orders, response.data])
        setClientId('')
        setDevice('')
        setIssue('')
      })
      .catch((error) => {
        alert('ERRO: ' + JSON.stringify(error.response?.data ?? error.message))
      })
  }

  function handleDelete(id: string) {
    api.delete(`/service-orders/${id}`).then(() => {
      setOrders(orders.filter((order) => order.id !== id))
    })
  }

  function clientName(id: string) {
    return clients.find((client) => client.id === id)?.name ?? 'Cliente desconhecido'
  }

  if (isLoading) {
    return <p className="text-gray-400">Carregando ordens de serviço...</p>
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-6 mb-6 space-y-3"
      >
        <h2 className="font-bold text-lg text-gray-800">Nova Ordem de Serviço</h2>

        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
        >
          <option value="">Selecione o cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Modelo do Aparelho"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="Defeito"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
        />

        <button
          type="submit"
          className="bg-primary text-white font-semibold px-5 py-2 rounded-full hover:bg-primary-dark transition"
        >
          Salvar
        </button>
      </form>

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
                    <p className="text-gray-500 text-sm mb-2">
                      <span className="font-medium text-gray-700">Defeito:</span> {order.issue}
                    </p>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-500 text-sm font-semibold hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceOrdersPage