import type { ServiceOrder } from '../types/ServiceOrder'

interface ServiceCardProps {
    order: ServiceOrder
}

function ServiceCard({ order }: ServiceCardProps) {
    const statusLabel = {
        aberto: 'Aberto',
        em_andamento: 'Em Andamento',
        finalizado: 'Finalizado',
    }[order.status]

    const statusColor = {
        aberto: 'bg-status-aberto',
        em_andamento: 'bg-status-andamento',
        finalizado: 'bg-status-finalizado',
    }[order.status]

    return (
         <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-bold text-lg text-gray-800">{order.clientName}</h3>
      <span className={`${statusColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
        {statusLabel}
      </span>
    </div>
    <p className="text-gray-500 text-sm">
      <span className="font-medium text-gray-700">Aparelho:</span> {order.deviceModel}
    </p>
    <p className="text-gray-500 text-sm">
      <span className="font-medium text-gray-700">Defeito:</span> {order.defect}
    </p>
  </div>
    
    )
}

export default ServiceCard