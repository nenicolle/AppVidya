import React, { useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Order } from '../../types/order'; 

interface OrdersListProps {
  orders: Order[];
  loading?: boolean;
  onOrderPress: (order: Order) => void;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, loading, onOrderPress }) => {
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(order =>
    order.clientName.toLowerCase().includes(search.toLowerCase()) ||
    order.id.toString().includes(search)
  );

  if (loading) {
    return <LoadingContainer><ActivityIndicator size="large" color="#007bff" /></LoadingContainer>;
  }

  return (
    <Container>
      <SearchInput
        placeholder="Buscar pedido..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <OrderItem onPress={() => onOrderPress(item)}>
            <OrderInfo>
              <OrderId>#{item.id}</OrderId>
              <ClientName>{item.clientName}</ClientName>
              <OrderDate>{new Date(item.date).toLocaleDateString('pt-BR')}</OrderDate>
            </OrderInfo>
            <OrderStatus status={item.status}>
              {item.status}
            </OrderStatus>
          </OrderItem>
        )}
        ListEmptyComponent={<EmptyText>Nenhum pedido encontrado</EmptyText>}
      />
    </Container>
  );
};

export default OrdersList;

const Container = styled.View`
  flex: 1;
  background-color: #f9f9f9;
`;

const SearchInput = styled.TextInput`
  background-color: #fff;
  padding: 12px;
  margin: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const OrderItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin-horizontal: 16px;
  margin-bottom: 8px;
  padding: 16px;
  border-radius: 8px;
  elevation: 2;
`;

const OrderInfo = styled.View``;

const OrderId = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

const ClientName = styled.Text`
  font-size: 14px;
  color: #555;
  margin-top: 4px;
`;

const OrderDate = styled.Text`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;

const OrderStatus = styled.Text<{ status: string }>`
  font-size: 12px;
  font-weight: 600;
  color: ${props => {
    switch (props.status) {
      case 'Pendente': return '#f39c12';
      case 'Entregue': return '#27ae60';
      case 'Cancelado': return '#e74c3c';
      default: return '#95a5a6';
    }
  }};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.Text`
  text-align: center;
  margin-top: 40px;
  color: #888;
  font-size: 16px;
`;