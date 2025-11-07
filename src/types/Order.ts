export interface Order {
  id: number;
  clientName: string;
  date: string;
  status: 'Pendente' | 'Entregue' | 'Cancelado';
  total: number;
}