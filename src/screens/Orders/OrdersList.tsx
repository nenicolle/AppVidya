import React, { useState, useMemo } from 'react';
import { FlatList, ActivityIndicator, Image } from 'react-native'; // <-- Adicionado Image
import styled from 'styled-components/native';
import { Order } from '../../database/schemas/Order';
import { getColorFromId, getInitials } from '../../utils/imageCard';
import { AddButton, AddButtonText } from '../../UI/Buttons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search } from 'lucide-react-native';

interface OrdersListProps {
  orders: Order[];
  loading?: boolean;
  onOrderPress?: (order: Order) => void;
}

type OrderScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Orders'>;

const StyledFlatList = styled(FlatList<Order>)`
  flex: 1;
`;

const OrdersList = ({ orders, loading, onOrderPress }: OrdersListProps) => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<OrderScreenNavigationProp>();

  const filteredOrders = useMemo(() => {
    if (!search.trim()) return orders;

    const searchLower = search.toLowerCase();

    return orders.filter((order) => {
      const clientName = order.client?.name?.toLowerCase() || '';
      const status = order.status?.toLowerCase() || '';
      const id = order._id.toHexString().toLowerCase();

      return (
        clientName.includes(searchLower) || status.includes(searchLower) || id.includes(searchLower)
      );
    });
  }, [orders, search]);

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
        <Search size={24} color="#888" />
        <SearchInput
          placeholder="Buscar por cliente, status ou ID..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
      </SearchContainer>

      <StyledFlatList
        data={filteredOrders}
        keyExtractor={(item) => item._id.toHexString()}
        renderItem={({ item }: { item: Order }) => {
          const hasPhoto = !!item.client?.photoUri;

          return (
            <OrderItem
              onPress={() => {
                onOrderPress?.(item);
                navigation.navigate('OrderDetails', {
                  orderId: item._id.toHexString(),
                });
              }}
            >
              {hasPhoto ? (
                <ClientImage source={{ uri: item.client!.photoUri }} resizeMode="cover" />
              ) : (
                <Avatar
                  style={{
                    backgroundColor: getColorFromId(item._id.toHexString().charCodeAt(0)),
                  }}
                >
                  <AvatarText>{getInitials(item.client?.name || '??')}</AvatarText>
                </Avatar>
              )}

              <OrderDetails>
                <ClientName>{item.client?.name || 'Cliente excluído'}</ClientName>
                <ProductCount>Qtd. produtos: {item.productCount ?? 0}</ProductCount>
              </OrderDetails>

              <OrderValue>R$ {item.totalValue.toFixed(2)}</OrderValue>
            </OrderItem>
          );
        }}
        ListEmptyComponent={
          <EmptyText>
            {search ? 'Nenhum pedido encontrado para a busca.' : 'Nenhum pedido cadastrado.'}
          </EmptyText>
        }
      />

      <AddButton onPress={() => navigation.navigate('SelectClient')}>
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
  padding: 0 14px;
  height: 48px;
  margin: 16px 16px 8px;
  border: 1px solid #eee;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  color: #333;
  font-size: 16px;
  margin-left: 8px;
`;

const OrderItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const Avatar = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const AvatarText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const ClientImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  margin-right: 12px;
  background-color: #f0f0f0;
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
  padding-horizontal: 20px;
`;
