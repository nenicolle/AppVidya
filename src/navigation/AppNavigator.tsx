import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
// import AboutScreen from '../screens/AboutScreen';

// 🔹 Tipos de rotas (muito importante!)
export type RootStackParamList = {
  Home: undefined;
  About: undefined;
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
        {/* <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'Sobre' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
