import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/Products/ProductsScreen';
import ProductDetailsScreen from '../screens/Products/ProductDetails';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;  
  Products: undefined;
  ProductDetails: { product: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Início' }}
        />
            <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ title: 'Produtos' }}
      />
  <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: 'Detalhes do Produto' }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
