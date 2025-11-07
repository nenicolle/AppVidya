import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import styled from 'styled-components/native';
import { Handbag, Store, User } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NavigationBar = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Container>
      <NavButton onPress={() => navigation.navigate('Orders')}>
        <Handbag />
        <NavText>Pedidos</NavText>
      </NavButton>

      <NavButton onPress={() => navigation.navigate('Clients')}>
        <User />
        <NavText>Clientes</NavText>
      </NavButton>

      <NavButton onPress={() => navigation.navigate('Products')}>
        <Store />
        <NavText>Produtos</NavText>
      </NavButton>
    </Container>
  );
};

export default NavigationBar;

const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  padding-vertical: 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  elevation: 8;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const NavButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 8px;
`;

const NavText = styled.Text`
  font-size: 12px;
  color: #333333;
  font-weight: 600;
  margin-top: 4px;
`;
