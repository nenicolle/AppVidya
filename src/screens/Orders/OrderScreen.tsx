import React from 'react';
import styled from 'styled-components/native';
import OrdersList from '../../screens/Orders/OrdersList';
import NavigationBar from '../../UI/NavigationBar';
import Header from '../../UI/Header/Header';
import { Order } from '../../database/schemas/Order';
import { useQuery } from '@realm/react';

const OrdersScreen = () => {
  const orders = useQuery(Order).sorted('createdAt', true);

  const handleOrderPress = (order: Order) => {
    console.log('Abrir detalhes do pedido:', order._id);
  };

  return (
    <Container>
      <Header title="Pedidos" />
      <OrdersList orders={Array.from(orders)} onOrderPress={handleOrderPress} />
      <NavigationBar />
    </Container>
  );
};

export default OrdersScreen;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;
