import React, { useState } from 'react';
import styled from 'styled-components/native';
import OrdersList from '../../screens/Orders/OrdersList';
import NavigationBar from '../../UI/NavigationBar';
import { Order } from '../../types/order';

const mockOrders: Order[] = [
  {
    id: 1,
    clientName: 'João Silva',
    date: '2025-04-01',
    status: 'Entregue',
    products: [
      { id: 1, name: 'Camiseta X', code: 'CAMX1', quantity: 2, unitPrice: 49.9, total: 2 * 49.9 },
      { id: 2, name: 'Boné Azul', code: 'BONZ1', quantity: 1, unitPrice: 29.9, total: 29.9 },
    ],
    productCount: 3,
    totalValue: 49.9 * 2 + 29.9,
  },
  {
    id: 2,
    clientName: 'Maria Oliveira',
    date: '2025-04-05',
    status: 'Pendente',
    products: [
      { id: 3, name: 'Calça Jeans', code: 'CJ001', quantity: 1, unitPrice: 89.9, total: 89.9 },
    ],
    productCount: 1,
    totalValue: 89.9,
  },
];

const OrdersScreen = () => {
  const [orders] = useState<Order[]>(mockOrders);

  const handleOrderPress = (order: Order) => {
    console.log('Abrir detalhes do pedido:', order.id);
  };

  return (
    <Container>
      <Header>
        <Title>Pedidos</Title>
      </Header>

      <OrdersList orders={orders} onOrderPress={handleOrderPress} />

      <NavigationBar />
    </Container>
  );
};

export default OrdersScreen;

const Container = styled.View`
  flex: 1;
  background-color: #f9f9f9;
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 16px;
  position: relative;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #333;
`;
