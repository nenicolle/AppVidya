import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/Products/ProductsScreen';
import ProductDetailsScreen from '../screens/Products/ProductDetails';
import CreateProduct from "../screens/Products/CreateProduct";
import { RootStackParamList } from '../types/navigation';
import OrdersScreen from '../screens/Orders/OrderScreen';
import ClientsScreen from '../screens/Clients/ClientScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false}}
        />
            <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ headerShown: false}}
      />
  <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen name="CreateProduct" component={CreateProduct}  options={{ headerShown: false }} /> 
       <Stack.Screen name="Orders" component={OrdersScreen }  options={{ headerShown: false }} />
        <Stack.Screen name="Clients" component={ClientsScreen}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
