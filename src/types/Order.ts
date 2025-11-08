export interface OrderProduct {
  id: number;
  name: string;
  code: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: number;
  clientName: string;
  date: string;
  status: 'Pendente' | 'Entregue' | 'Cancelado';
  totalValue: number;
  productCount: number;
  products: OrderProduct[];
}
