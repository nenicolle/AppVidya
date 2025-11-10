import React, { useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import NavigationBar from '../../UI/NavigationBar';
import { AddButton, AddButtonText } from '../../UI/Buttons';
import { Search } from 'lucide-react-native';
import Header from '../../UI/Header/Header';
import { Product } from '../../database/schemas/Product';
import { useRealm } from '@realm/react';

type ProductsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Products'>;

export default function ProductsScreen() {
  const navigation = useNavigation<ProductsScreenNavigationProp>();
  const realm = useRealm();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  if (loading || !realm) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#007aff" />
      </LoadingContainer>
    );
  }

  // Busca no Realm
  const allProducts = realm.objects<Product>('Product');
  const filteredProducts = search
    ? allProducts.filtered('name CONTAINS[c] $0', search)
    : allProducts;

  return (
    <Container>
      <Header title="Produtos" />
      <SearchContainer>
        <Search size={24} color="#333" />
        <SearchInput
          placeholder="Pesquisar produto..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </SearchContainer>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item._id.toHexString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <ProductCard
            onPress={() =>
              navigation.navigate('ProductDetails', { productId: item._id.toHexString() })
            }
          >
            <ProductImage
              source={{ uri: item.image || 'https://via.placeholder.com/100' }}
              resizeMode="cover"
            />
            <ProductInformation>
              <ProductName numberOfLines={1}>{item.name}</ProductName>
              <ProductPrice>R$ {item.price.toFixed(2)}</ProductPrice>
            </ProductInformation>
          </ProductCard>
        )}
        ListEmptyComponent={<EmptyText>Nenhum produto encontrado</EmptyText>}
      />

      <AddButton onPress={() => navigation.navigate('CreateProduct')}>
        <AddButtonText>+</AddButtonText>
      </AddButton>
      <NavigationBar />
    </Container>
  );
}
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;
const ProductInformation = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 15px;
`;

const SearchContainer = styled.View`
  background-color: #f9f9f9;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  padding: 00px 14px;
  height: 40px;
  margin-bottom: 16px;
`;
const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const SearchInput = styled.TextInput`
  flex: 1;
  color: #333;
  font-size: 16px;
`;

const ProductCard = styled.TouchableOpacity`
  flex: 1;
  background-color: #f4f7fb;
  border-radius: 12px;
  margin: 6px;
  /* padding: 15px; */
  align-items: start;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 80px;
  border-radius: 8px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  background-color: #dfe8f5;
`;

const ProductName = styled.Text`
  font-size: 14px;
  color: #222;
`;
const EmptyText = styled.Text`
  text-align: center;
  margin-top: 40px;
  color: #888;
  font-size: 16px;
`;
const ProductPrice = styled.Text`
  font-size: 15px;
  font-weight: 700;
  margin-top: 4px;
`;

const BottomNavbar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #fff;
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: #ccc;
  justify-content: space-around;
  align-items: center;
`;

const NavButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NavText = styled.Text`
  font-size: 16px;
  color: #007aff;
  font-weight: 600;
`;
