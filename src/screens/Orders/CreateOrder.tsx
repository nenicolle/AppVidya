import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../../UI/Header/Header';
import { Alert } from 'react-native';
import { Client } from '../../database/schemas/ClientSchema';
import { Product } from '../../database/schemas/Product';
import { useRealm, useQuery } from '@realm/react';
import { Realm } from '@realm/react';
import { RootStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateOrder'>;

export default function CreateOrder() {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<any>();
  const { clientId } = route.params as { clientId?: string };

  const realm = useRealm();
  const products = useQuery(Product);

  // Busca o cliente com segurança
  const client = clientId
    ? realm.objectForPrimaryKey<Client>('Client', new Realm.BSON.ObjectId(clientId))
    : null;

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const hasSelectedProducts = Object.values(quantities).some((q) => q > 0);

  // Validação precoce: cliente não encontrado
  if (!clientId || !client) {
    return (
      <Container>
        <Header title="Erro" showBack />
        <ErrorContainer>
          <ErrorText>Cliente não encontrado.</ErrorText>
          <ErrorText>ID inválido ou ausente.</ErrorText>
        </ErrorContainer>
      </Container>
    );
  }

  const handleSave = () => {
    const selectedItems = products
      .filter((p) => quantities[p._id.toHexString()] > 0)
      .map((p) => {
        const qty = quantities[p._id.toHexString()];
        return {
          _id: new Realm.BSON.ObjectId(),
          product: p,
          quantity: qty,
          unitPrice: p.price ?? 0,
          subtotal: qty * (p.price ?? 0),
        };
      });

    if (selectedItems.length === 0) {
      Alert.alert('Selecione pelo menos um produto!');
      return;
    }

    const totalValue = selectedItems.reduce((s, i) => s + i.subtotal, 0);
    const productCount = selectedItems.reduce((s, i) => s + i.quantity, 0);

    try {
      realm.write(() => {
        realm.create('Order', {
          _id: new Realm.BSON.ObjectId(),
          client: client,
          items: selectedItems,
          totalValue,
          productCount,
          status: 'Pendente',
          createdAt: new Date(),
        });
        setQuantities({});
      });

      Alert.alert('Sucesso', 'Pedido criado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err: any) {
      console.error('Erro ao salvar pedido:', err);
      Alert.alert('Erro', err.message || 'Falha ao salvar o pedido.');
    }
  };

  const updateQty = (productId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] ?? 0) + delta),
    }));
  };

  const renderItem = ({ item }: { item: Product }) => {
    const pid = item._id.toHexString();
    return (
      <ProductItem>
        <ProductImage source={{ uri: item.image }} />
        <ProductInfo>
          <ProductName>{item.name}</ProductName>
          <ProductCode>Cód: {item.code}</ProductCode>
          <QtyContainer>
            <QtyButton onPress={() => updateQty(pid, -1)}>
              <QtyText>-</QtyText>
            </QtyButton>
            <QtyValue>{quantities[pid] ?? 0}</QtyValue>
            <QtyButton onPress={() => updateQty(pid, 1)}>
              <QtyText>+</QtyText>
            </QtyButton>
          </QtyContainer>
        </ProductInfo>
        <ProductPrice>R$ {item.price.toFixed(2)}</ProductPrice>
      </ProductItem>
    );
  };

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
        keyExtractor={(item) => item._id.toHexString()}
        renderItem={renderItem}
      />

      <Footer>
        <SaveButton onPress={handleSave} disabled={!hasSelectedProducts}>
          <SaveText>{hasSelectedProducts ? 'Salvar' : 'Selecione algum produto'}</SaveText>
        </SaveButton>
      </Footer>
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
  background-color: #fff;
  padding: 16px;
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
const Footer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #eaeaea;
`;
const SaveButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007aff')};
  padding: 16px;
  border-radius: 10px;
  align-items: center;
`;
const SaveText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
