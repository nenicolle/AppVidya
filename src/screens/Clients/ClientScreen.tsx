import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import ClientsList from '../../screens/Clients/ClientList';
import NavigationBar from '../../UI/NavigationBar';
import Header from '../../UI/Header/Header';
import { AddButton, AddButtonText } from '../../UI/Buttons';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Clients'>;

export default function ClientsScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <Container>
      <Header title="Clientes" />

      <ClientsList />

      <AddButton onPress={() => navigation.navigate('CreateClient')}>
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
