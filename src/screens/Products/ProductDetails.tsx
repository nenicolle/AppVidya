import React from 'react';
import styled from 'styled-components/native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../types/navigation';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen() {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation();
  const { product } = route.params;

  return (
    <Container>
      {product.image && <ProductImage source={{ uri: product.image }} />}

      <Title>{product.name}</Title>
      <Price>R$ {product.price.toFixed(2)}</Price>
      <Description>
        Descrição: Produto de alta qualidade da linha Vidya
      </Description>

      <ButtonContainer onPress={() => navigation.goBack()}>
        <ButtonText>Voltar</ButtonText>
      </ButtonContainer>
    </Container>
  );
}

// 🎨 Estilização com styled-components
const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  margin-bottom: 20px;
  background-color: #dfe8f5;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Price = styled.Text`
  font-size: 18px;
  color: #007aff;
  margin-bottom: 15px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #333;
`;

const ButtonContainer = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #007aff;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
