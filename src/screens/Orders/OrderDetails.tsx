import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../types/navigation';
import { Order } from '../../types/order';
import { getColorFromId, getInitials } from '../../utils/imageCard';
import { ChevronLeft } from 'lucide-react-native';

type OrderDetailsRouteProp = RouteProp<RootStackParamList, 'OrderDetails'>;

export default function OrderDetails() {
  const route = useRoute<OrderDetailsRouteProp>();
  const { order } = route.params;
  const navigation = useNavigation();
  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} />
        </BackButton>
        <HeaderTitle>Detalhes do pedido</HeaderTitle>
      </Header>

      <Section>
        <Avatar style={{ backgroundColor: getColorFromId(order.id) }}>
          <AvatarText>{getInitials(order.clientName)}</AvatarText>
        </Avatar>
        <HeaderInfo>
          <ClientName>{order.clientName}</ClientName>
          <OrderStatus status={order.status}>{order.status}</OrderStatus>
        </HeaderInfo>
      </Section>
      <Section>
        <SectionTitle>Resumo do Pedido</SectionTitle>
        <InfoRow>
          <Label>ID do Pedido:</Label>
          <Value>#{order.id}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Data:</Label>
          <Value>{new Date(order.date).toLocaleDateString('pt-BR')}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Qtd. de produtos:</Label>
          <Value>{order.productCount}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Valor total:</Label>
          <Value>R$ {order.totalValue.toFixed(2)}</Value>
        </InfoRow>
      </Section>

      {order.products && order.products.length > 0 && (
        <Section>
          <SectionTitle>Produtos</SectionTitle>
          {order.products.map((p) => (
            <ProductCard key={p.id}>
              <ProductInfo>
                <ProductName>{p.name}</ProductName>
                <ProductDetails>
                  {p.quantity}x R$ {p.unitPrice.toFixed(2)}
                </ProductDetails>
              </ProductInfo>
              <ProductTotal>R$ {(p.unitPrice * p.quantity).toFixed(2)}</ProductTotal>
            </ProductCard>
          ))}
        </Section>
      )}
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 16px;
  position: relative;
`;

const Avatar = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const AvatarText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 20px;
`;

const HeaderInfo = styled.View``;

const ClientName = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #333;
`;

const OrderStatus = styled.Text<{ status: string }>`
  font-size: 14px;
  color: ${({ status }) =>
    status === 'Pendente' ? '#f39c12' : status === 'Entregue' ? '#27ae60' : '#e74c3c'};
`;

const Section = styled.View`
  margin-bottom: 24px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
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

const ProductCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 8px;
`;
const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  padding: 8px;
`;
const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;

const ProductInfo = styled.View``;

const ProductName = styled.Text`
  font-size: 14px;
  font-weight: 600;
`;

const ProductDetails = styled.Text`
  font-size: 13px;
  color: #777;
  margin-top: 2px;
`;

const ProductTotal = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;
