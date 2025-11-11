// ProductDetailsScreen.tsx
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { X, Image as ImageIcon } from 'lucide-react-native';
import { getRealm } from '../../database/realmInstance';
import { Product } from '../../database/schemas/Product';
import Realm from 'realm';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen() {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation<any>();
  const { productId } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      if (!productId) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const realm = await getRealm();
        const objId = new Realm.BSON.ObjectId(productId);
        const foundProduct = realm.objectForPrimaryKey<Product>('Product', objId);

        if (isMounted) {
          setProduct(foundProduct || null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
        if (isMounted) setLoading(false);
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  // Loading
  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#007aff" />
      </LoadingContainer>
    );
  }

  // Produto não encontrado
  if (!product) {
    return (
      <NotFoundContainer>
        <NotFoundText>Produto não encontrado</NotFoundText>
        <CloseButton onPress={() => navigation.goBack()}>
          <X size={28} color="#000" />
        </CloseButton>
      </NotFoundContainer>
    );
  }

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
        <Description>{product.description}</Description>
      </Content>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: 16px;
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
  background-color: rgba(255, 255, 255, 0.8);
  padding: 8px;
  border-radius: 20px;
`;

const ImageWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
`;

const Placeholder = styled.View`
  width: 100px;
  height: 100px;
  background-color: #dfe8f5;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

const Content = styled.View`
  padding: 24px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-bottom: 8px;
`;

const Price = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #007aff;
  margin-bottom: 16px;
`;

const Description = styled.Text`
  font-size: 15px;
  color: #555;
  line-height: 22px;
`;

// Loading e Not Found
const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const NotFoundContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

const NotFoundText = styled.Text`
  font-size: 18px;
  color: #e74c3c;
  margin-bottom: 20px;
`;
