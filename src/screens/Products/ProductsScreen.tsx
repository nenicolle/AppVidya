import React, { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import NavigationBar from "../../UI/NavigationBar";
import { AddButton, AddButtonText } from "../../UI/Buttons";

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
}

type ProductsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Products"
>;

export default function ProductsScreen() {
  const navigation = useNavigation<ProductsScreenNavigationProp>();
  const [search, setSearch] = useState("");
  const [products] = useState<Product[]>([
    { id: "1", name: "Produto 1", price: 23.99, image: "https://via.placeholder.com/100" },
    { id: "2", name: "Produto 2", price: 23.99, image: "https://via.placeholder.com/100" },
    { id: "3", name: "Produto 3", price: 23.99, image: "https://via.placeholder.com/100" },
    { id: "4", name: "Produto 4", price: 23.99, image: "https://via.placeholder.com/100" },
    { id: "5", name: "Produto 5", price: 23.99, image: "https://via.placeholder.com/100" },
    { id: "6", name: "Produto 6", price: 23.99, image: "https://via.placeholder.com/100" },
  ]);

  return (
    <Container>
      <Header>Produtos</Header>

      <SearchContainer>
        <SearchInput
          placeholder="Pesquisar"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </SearchContainer>

      <FlatList
        data={products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }} 
        renderItem={({ item }) => (
          <ProductCard
            onPress={() =>
              navigation.navigate("ProductDetails", { product: item })
            }
          >
            <ProductImage source={{ uri: item.image }}/>
            <ProductName>{item.name}</ProductName>
            <ProductPrice>R$ {item.price.toFixed(2)}</ProductPrice>
          </ProductCard>
        )}
      />

      <AddButton onPress={() => navigation.navigate("CreateProduct")}>
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

const Header = styled.Text`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
`;

const SearchContainer = styled.View`
  background-color: #f5f5f5;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  padding: 10px 14px;
  margin-bottom: 16px;
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
  padding: 12px;
  align-items: center;
`;

const ProductImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: #dfe8f5;
`;

const ProductName = styled.Text`
  font-size: 14px;
  color: #222;
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
