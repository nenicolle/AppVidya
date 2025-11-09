import React from 'react';
import styled from 'styled-components/native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../types/navigation';
import { X, Image as ImageIcon } from 'lucide-react-native';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen() {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation();
  const { product } = route.params;

  return (
    <Container>
      <HeaderArea>
        <CloseButton onPress={() => navigation.goBack()}>
          <X size={28} color="#000" />
        </CloseButton>

        <ImageWrapper>
          {product.image ? (
            <ProductImage source={{ uri: product.image }} resizeMode="cover" />
          ) : (
            <Placeholder>
              <ImageIcon size={40} color="#9DB7E5" />
            </Placeholder>
          )}
        </ImageWrapper>
      </HeaderArea>

      <Content>
        <Title>{product.name}</Title>
        <Price>R$ {product.price.toFixed(2)}</Price>
        <Description>{product.description} </Description>
      </Content>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const HeaderArea = styled.View`
  background-color: #eaf0fb;
  height: 300px;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 10;
`;

const ImageWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Placeholder = styled.View`
  width: 80px;
  height: 80px;
  background-color: #dfe8f5;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 0px;
`;

const Content = styled.View`
  padding: 24px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 6px;
`;

const Price = styled.Text`
  font-size: 16px;
  color: #000;
  margin-bottom: 16px;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #555;
  line-height: 20px;
`;
