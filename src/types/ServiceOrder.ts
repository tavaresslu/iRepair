export interface ServiceOrder {
  id: string;
  clientName: string;
  deviceModel: string;
  defect: string;
  status: 'aberto' | 'em_andamento' | 'finalizado';
}