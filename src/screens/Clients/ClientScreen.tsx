import React from 'react';
import styled from 'styled-components/native';
import ClientsList from '../../screens/Clients/ClientList';
import NavigationBar from '../../UI/NavigationBar';
import { AddButton, AddButtonText } from '../../UI/Buttons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../../UI/Header/Header';
import { useQuery } from '@realm/react';
import { Client } from '../../database/schemas/ClientSchema';

type ClientsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Clients'>;

export default function ClientsScreen() {
  const navigation = useNavigation<ClientsScreenNavigationProp>();
  const clients = useQuery(Client).sorted('name');

  return (
    <Container>
      <Header title="Clientes" />
      <ClientsList clients={Array.from(clients)} loading={false} />
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
