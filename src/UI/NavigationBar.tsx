import React from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import styled from 'styled-components/native';
import { Handbag, Store, User } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NavigationBar = () => {
  const navigation = useNavigation<NavigationProp>();
  const currentRoute = useNavigationState((state) => state.routes[state.index].name);

  return (
    <Container>
      <NavButton onPress={() => navigation.navigate('Orders')}>
        <Handbag color={currentRoute === 'Orders' ? '#007AFF' : '#888'} />
        <NavText active={currentRoute === 'Orders'}>Pedidos</NavText>
      </NavButton>

      <NavButton onPress={() => navigation.navigate('Clients')}>
        <User color={currentRoute === 'Clients' ? '#007AFF' : '#888'} />
        <NavText active={currentRoute === 'Clients'}>Clientes</NavText>
      </NavButton>

      <NavButton onPress={() => navigation.navigate('Products')}>
        <Store color={currentRoute === 'Products' ? '#007AFF' : '#888'} />
        <NavText active={currentRoute === 'Products'}>Produtos</NavText>
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

const NavText = styled.Text<{ active?: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.active ? '#007AFF' : '#333')};
  font-weight: ${(props) => (props.active ? '700' : '600')};
  margin-top: 4px;
`;
