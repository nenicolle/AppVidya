import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../../UI/Header/Header';

interface Client {
  id: string;
  name: string;
  cnpj: string;
}
interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
}
interface RouteParams {
  client?: Client | null; // opcional
}

type NavigationProp = NativeStackNavigationProp<any>;

export default function CreateOrder() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<any>();
  const { client } = route.params as RouteParams;

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const products: Product[] = [
    {
      id: '1',
      name: 'Camiseta',
      code: 'CAM001',
      price: 49.9,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '2',
      name: 'Calça Jeans',
      code: 'JEANS002',
      price: 189.9,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '3',
      name: 'Tênis',
      code: 'TENIS003',
      price: 299.9,
      image: 'https://via.placeholder.com/100',
    },
  ];

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const renderItem = ({ item }: { item: Product }) => (
    <ProductItem>
      <ProductImage source={{ uri: item.image }} />
      <ProductInfo>
        <ProductName>{item.name}</ProductName>
        <ProductCode>Cód: {item.code}</ProductCode>
      </ProductInfo>

      <QtyContainer>
        <QtyButton onPress={() => updateQty(item.id, -1)}>
          <QtyText>-</QtyText>
        </QtyButton>
        <QtyValue>{quantities[item.id] || 0}</QtyValue>
        <QtyButton onPress={() => updateQty(item.id, 1)}>
          <QtyText>+</QtyText>
        </QtyButton>
      </QtyContainer>

      <ProductPrice>R$ {item.price.toFixed(2)}</ProductPrice>
    </ProductItem>
  );

  if (!client) {
    return (
      <Container>
        <Header title="Erro" showBack />
        <ErrorContainer>
          <ErrorText>Cliente não selecionado.</ErrorText>
          <ErrorText>Voltando...</ErrorText>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header title="Cadastro de pedido" showBack />
      <ClientSection>
        <ClientName>{client.name}</ClientName>
        <ClientCNPJ>CNPJ: {client.cnpj}</ClientCNPJ>
      </ClientSection>

      <SectionTitle>Produtos</SectionTitle>

      <StyledFlatList
        data={products}
        keyExtractor={(item: Product) => item.id}
        renderItem={renderItem}
      />
    </Container>
  );
}

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: #d32f2f;
  text-align: center;
  margin-top: 8px;
`;
const Container = styled.View`
  flex: 1;
  background: #fff;
`;

const ClientSection = styled.View`
  padding: 16px;
  background: #f9f9f9;
`;
const ClientName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;
const ClientCNPJ = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;
const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  padding: 16px 16px 8px;
`;

const StyledFlatList = styled(FlatList).attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
}))`` as unknown as typeof FlatList<Product>;

const ProductItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-color: #eee;
`;
const ProductImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 12px;
`;
const ProductInfo = styled.View`
  flex: 1;
`;
const ProductName = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #000;
`;
const ProductCode = styled.Text`
  font-size: 13px;
  color: #888;
`;
const QtyContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 16px;
`;
const QtyButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background: #007bff;
  justify-content: center;
  align-items: center;
`;
const QtyText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
const QtyValue = styled.Text`
  margin: 0 12px;
  font-size: 16px;
  min-width: 24px;
  text-align: center;
`;
const ProductPrice = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #000;
`;
