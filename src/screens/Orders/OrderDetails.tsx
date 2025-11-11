import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../types/navigation';
import { useObject } from '@realm/react';
import { Order } from '../../database/schemas/Order';
import { Realm } from '@realm/react';
import { getColorFromId, getInitials } from '../../utils/imageCard';
import Header from '../../UI/Header/Header';

type OrderDetailsRouteProp = RouteProp<RootStackParamList, 'OrderDetails'>;

export default function OrderDetails() {
  const route = useRoute<OrderDetailsRouteProp>();
  const { orderId } = route.params;

  const order = useObject<Order>('Order', new Realm.BSON.ObjectId(orderId));

  if (!order) {
    return (
      <Container>
        <Header title="Detalhes do Pedido" showBack />
        <ErrorContainer>
          <ErrorText>Pedido não encontrado.</ErrorText>
        </ErrorContainer>
      </Container>
    );
  }

  const shortId = order._id.toHexString().slice(-6).toUpperCase();

  return (
    <Container>
      <Header title="Cadastro de pedido" showBack />

      <ClientCard>
        <ClientLabel>Cliente selecionado</ClientLabel>
        <ClientInfoRow>
          {order.client?.photoUri ? (
            <ClientImage source={{ uri: order.client.photoUri }} />
          ) : (
            <ClientAvatar
              style={{
                backgroundColor: getColorFromId(order._id.toHexString().charCodeAt(0)),
              }}
            >
              <AvatarText>{getInitials(order.client?.name || '??')}</AvatarText>
            </ClientAvatar>
          )}
          <ClientDetails>
            <ClientName>{order.client?.name || 'Cliente excluído'}</ClientName>
            <ClientDoc>{order.client?.cnpj || '00.000.000/0000-00'}</ClientDoc>
          </ClientDetails>
        </ClientInfoRow>
      </ClientCard>

      <Section>
        <SectionTitle>Produtos</SectionTitle>
        {order.items.map((item, index) => (
          <ProductItem key={index}>
            {item.product?.image ? (
              <ProductImage source={{ uri: item.product.image }} />
            ) : (
              <ProductPlaceholder>
                <PlaceholderIcon></PlaceholderIcon>
              </ProductPlaceholder>
            )}
            <ProductInfo>
              <ProductCode>Cód. {item.product?.code || '1'}</ProductCode>
              <ProductName>{item.product?.name || 'Produto excluído'}</ProductName>
            </ProductInfo>

            <ProductPrice>R${item.unitPrice.toFixed(2)}</ProductPrice>
          </ProductItem>
        ))}
      </Section>

      <SummarySection>
        <InfoRow>
          <Label>ID do Pedido:</Label>
          <Value>#{shortId}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Data:</Label>
          <Value>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Qtd. total:</Label>
          <Value>{order.productCount}</Value>
        </InfoRow>
        <TotalRow>
          <TotalLabel>Valor total:</TotalLabel>
          <TotalValue>R$ {order.totalValue.toFixed(2)}</TotalValue>
        </TotalRow>
      </SummarySection>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

const ClientCard = styled.View`
  background-color: #f8f9fa;
  border-radius: 16px;
  padding: 16px;
  margin: 16px 16px 8px;
  border: 1px solid #e9ecef;
`;

const ClientLabel = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const ClientInfoRow = styled.View`
  flex-direction: row TRA;
  align-items: center;
`;

const ClientImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 12px;
`;

const ClientAvatar = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const AvatarText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

const ClientDetails = styled.View`
  flex: 1;
`;

const ClientName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const ClientDoc = styled.Text`
  font-size: 13px;
  color: #888;
  margin-top: 2px;
`;

const DropdownIcon = styled.Text`
  font-size: 16px;
  color: #007bff;
`;

const Section = styled.View`
  margin: 8px 16px 16px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
`;

const ProductItem = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 10px;
  border: 1px solid #e9ecef;
`;

const ProductImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 12px;
`;

const ProductPlaceholder = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: #e9ecef;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const PlaceholderIcon = styled.Text`
  font-size: 24px;
`;

const ProductInfo = styled.View`
  flex: 1;
  justify-content: center;
`;

const ProductCode = styled.Text`
  font-size: 12px;
  color: #666;
`;

const ProductName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-top: 2px;
`;

const ProductPrice = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #000;
`;

const SummarySection = styled.View`
  margin: 16px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 6px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #666;
`;

const Value = styled.Text`
  font-size: 14px;
  color: #000;
  font-weight: 500;
`;

const TotalRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 12px;
  margin-top: 8px;
  border-top-width: 1px;
  border-top-color: #ddd;
`;

const TotalLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const TotalValue = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: #e74c3c;
  text-align: center;
`;
