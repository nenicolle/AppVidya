// OrdersList.tsx (corrigido)
import React, { useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Order } from '../../types/order';
import { getColorFromId, getInitials } from '../../utils/imageCard';
import { AddButton, AddButtonText } from '../../UI/Buttons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search } from 'lucide-react-native';

interface OrdersListProps {
  orders: Order[];
  loading?: boolean;
  onOrderPress: (order: Order) => void;
}

type OrderScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Orders'>;

const OrdersList = ({ orders, loading }: OrdersListProps) => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const filteredOrders = orders.filter((order) =>
    order.clientName.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#007bff" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <SearchContainer>
        <Search size={24} color="#333" />
        <SearchInput
          placeholder="Buscar cliente..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </SearchContainer>

      <StyledFlatList
        data={filteredOrders}
        keyExtractor={(item: Order) => item.id.toString()}
        renderItem={({ item }: { item: Order }) => (
          <OrderItem onPress={() => navigation.navigate('OrderDetails', { order: item })}>
            <Avatar style={{ backgroundColor: getColorFromId(item.id) }}>
              <AvatarText>{getInitials(item.clientName)}</AvatarText>
            </Avatar>

            <OrderDetails>
              <ClientName>{item.clientName}</ClientName>
              <ProductCount>Qtd. produtos: {item.productCount}</ProductCount>
            </OrderDetails>

            <OrderValue>R$ {item.totalValue.toFixed(2)}</OrderValue>
          </OrderItem>
        )}
        ListEmptyComponent={<EmptyText>Nenhum pedido encontrado</EmptyText>}
      />

      <AddButton onPress={() => navigation.navigate('CreateOrder', { client: null as any })}>
        <AddButtonText>+</AddButtonText>
      </AddButton>
    </Container>
  );
};

export default OrdersList;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const SearchContainer = styled.View`
  background-color: #f9f9f9;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  padding: 0px 14px;
  height: 40px;
  margin-bottom: 20px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  color: #333;
  font-size: 16px;
`;

const OrderItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
`;

const Avatar = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const AvatarText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const OrderDetails = styled.View`
  flex: 1;
`;

const ClientName = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #333;
`;

const ProductCount = styled.Text`
  font-size: 13px;
  color: #888;
  margin-top: 2px;
`;

const OrderValue = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #000;
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

const StyledFlatList = styled(FlatList as new (props: any) => FlatList<Order>)`
  flex: 1;
`;
