import React, { useState } from 'react';
import styled from 'styled-components/native';
import ClientsList from '../../screens/Clients/ClientList';
import NavigationBar from '../../UI/NavigationBar';
import { Client } from '../../types/client';

const mockClients: Client[] = [
  { id: 1, name: 'Ana Costa', email: 'ana@email.com', phone: '(11) 98765-4321' },
  { id: 2, name: 'Pedro Santos', email: 'pedro@email.com', phone: '(21) 91234-5678' },
];

const ClientsScreen = () => {
  const [clients] = useState<Client[]>(mockClients);
  const [loading] = useState(false);

  const handleClientPress = (client: Client) => {
    console.log('Cliente selecionado:', client);
  };

  return (
    <ScreenContainer>
      <Header>
        <Title>Clientes</Title>
      </Header>

      <ClientsList
        clients={clients}
        loading={loading}
        onClientPress={handleClientPress}
      />

      <NavigationBar />
    </ScreenContainer>
  );
};

export default ClientsScreen;

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #f9f9f9;
`;

const Header = styled.View`
  padding: 20px;
  background-color: #fff;
  elevation: 2;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;