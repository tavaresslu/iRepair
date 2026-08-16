import { useEffect, useState } from 'react'
import api from '../services/api'
import type { Client, NewClient } from '../types/client'

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetchClients()
  }, [])

  function fetchClients() {
    setIsLoading(true)
    api
      .get<Client[]>('/clients')
      .then((response) => setClients(response.data))
      .finally(() => setIsLoading(false))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !phone || !email) return

    const newClient: NewClient = { name, phone, email }

    api.post<Client>('/clients', newClient).then((response) => {
      setClients([...clients, response.data])
      setName('')
      setPhone('')
      setEmail('')
    })
  }

  function handleDelete(id: number) {
    api.delete(`/clients/${id}`).then(() => {
      setClients(clients.filter((client) => client.id !== id))
    })
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-6 mb-6 space-y-3"
      >
        <h2 className="font-bold text-lg text-gray-800">Novo Cliente</h2>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
        />

        <button
          type="submit"
          className="bg-primary text-white font-semibold px-5 py-2 rounded-full hover:bg-primary-dark transition"
        >
          Salvar
        </button>
      </form>

      <h2 className="font-bold text-gray-600 mb-3">Clientes cadastrados</h2>

      {isLoading ? (
        <p className="text-gray-400">Carregando clientes...</p>
      ) : (
        <div className="space-y-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-gray-800">{client.name}</h3>
                <p className="text-gray-500 text-sm">{client.phone}</p>
                <p className="text-gray-500 text-sm">{client.email}</p>
              </div>
              <button
                onClick={() => handleDelete(client.id)}
                className="text-red-500 text-sm font-semibold hover:underline"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ClientsPage