import { useState } from 'react'
import type { ServiceOrder } from '../types/ServiceOrder'

interface NewServiceFormProps {
    onAddOrder: (order: ServiceOrder) => void
}

function NewServiceForm({ onAddOrder }: NewServiceFormProps) {
    const [clientName, setClientName] = useState('')
    const [deviceModel, setDeviceModel] = useState('')
    const [defect, setDefect] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!clientName || !deviceModel || !defect) return

        const newOrder: ServiceOrder = {
            id: crypto.randomUUID(),
            clientName,
            deviceModel,
            defect,
            status: 'aberto',
        }

        onAddOrder(newOrder)

        setClientName('')
        setDeviceModel('')
        setDefect('')
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 mb-6 space-y-3">
            <h2 className="font-bold text-lg text-gray-800">Nova Ordem de Serviço</h2>

            <input
                type="text"
                placeholder="Nome do Cliente"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" />

            <input
                type="text"
                placeholder="Modelo do Aparelho"
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" />

            <input
                type="text"
                placeholder="Defeito"
                value={defect}
                onChange={(e) => setDefect(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" />

            <button
                type="submit"
                className="bg-primary text-white font-semibold px-5 py-2 rounded-full hover:bg-primary-dark transition"
            >
                Salvar
            </button>
        </form>
    )
}

export default NewServiceForm