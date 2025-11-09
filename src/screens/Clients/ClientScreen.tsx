import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import ClientsList from '../../screens/Clients/ClientList';
import NavigationBar from '../../UI/NavigationBar';
import { Client } from '../../types/client';
import { AddButton, AddButtonText } from '../../UI/Buttons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../../UI/Header/Header';

type ClientsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Clients'>;

export const mockClients: Client[] = [
  {
    id: 1,
    name: 'Ana Costa',
    cnpj: '12.345.678/0001-99',
    phone: '(11) 98765-4321',
    cep: '01001-000',
    state: 'SP',
    city: 'São Paulo',
    neighborhood: 'Sé',
    address: 'Praça da Sé',
    number: '100',
  },
  {
    id: 2,
    name: 'Pedro Santos',
    cnpj: '98.765.432/0001-11',
    phone: '(21) 91234-5678',
    cep: '20040-020',
    state: 'RJ',
    city: 'Rio de Janeiro',
    neighborhood: 'Centro',
    address: 'Av. Rio Branco',
    number: '45',
  },
];

export default function ClientsScreen() {
  const navigation = useNavigation<ClientsScreenNavigationProp>();
  const [clients] = useState<Client[]>(mockClients);
  const [loading] = useState(false);

  const handleClientPress = useCallback(
    (client: Client) => {
      // navega para ClientDetails passando o client
      navigation.navigate('ClientDetails', { client });
    },
    [navigation],
  );

  return (
    <Container>
      <Header title="Clientes" />
      <ClientsList clients={clients} loading={loading} />
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
