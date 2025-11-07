import React, { useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Client } from '../../types/client';
import { Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation'; // seu tipo de navegação

interface ClientsListProps {
  clients: Client[];
  loading?: boolean;
}

const ClientsList = ({ clients, loading }: ClientsListProps) => {
  const [search, setSearch] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
  );

  const handleClientPress = (client: Client) => {
    navigation.navigate('ClientDetails', { client });
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#007bff" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <SearchContainer>
        <Search size={24} color="#333" />
        <SearchInput
          placeholder="Buscar cliente..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </SearchContainer>
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={filteredClients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ClientItem onPress={() => handleClientPress(item)}>
            <ClientInfo>
              <ClientName>{item.name}</ClientName>
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

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const SearchContainer = styled.View`
  background-color: #f9f9f9;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  padding: 0px 14px;
  height: 40px;
  margin-bottom: 20px;
`;
const SearchInput = styled.TextInput`
  flex: 1;
  color: #333;
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
