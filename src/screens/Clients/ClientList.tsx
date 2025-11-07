import React, { useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Client } from '../../types/client';

interface ClientsListProps {
  clients: Client[];
  loading?: boolean;
  onClientPress: (client: Client) => void;
}

const ClientsList: React.FC<ClientsListProps> = ({ clients, loading, onClientPress }) => {
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <LoadingContainer><ActivityIndicator size="large" color="#007bff" /></LoadingContainer>;
  }

  return (
    <Container>
      <SearchInput
        placeholder="Buscar cliente..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredClients}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ClientItem onPress={() => onClientPress(item)}>
            <ClientInfo>
              <ClientName>{item.name}</ClientName>
              <ClientEmail>{item.email}</ClientEmail>
              <ClientPhone>{item.phone}</ClientPhone>
            </ClientInfo>
          </ClientItem>
        )}
        ListEmptyComponent={<EmptyText>Nenhum cliente encontrado</EmptyText>}
      />
    </Container>
  );
};

export default ClientsList;

const Container = styled.View`
  flex: 1;
  background-color: #f9f9f9;
`;

const SearchInput = styled.TextInput`
  background-color: #fff;
  padding: 12px;
  margin: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const ClientItem = styled.TouchableOpacity`
  background-color: #fff;
  margin-horizontal: 16px;
  margin-bottom: 8px;
  padding: 16px;
  border-radius: 8px;
  elevation: 2;
`;

const ClientInfo = styled.View``;

const ClientName = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

const ClientEmail = styled.Text`
  font-size: 14px;
  color: #555;
  margin-top: 4px;
`;

const ClientPhone = styled.Text`
  font-size: 13px;
  color: #888;
  margin-top: 4px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.Text`
  text-align: center;
  margin-top: 40px;
  color: #888;
  font-size: 16px;
`;