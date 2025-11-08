import React, { useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Client } from '../../types/client';
import { Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

interface ClientsListProps {
  clients: Client[];
  loading?: boolean;
}

const ClientsList = ({ clients, loading }: ClientsListProps) => {
  const [search, setSearch] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleClientPress = (client: Client) => {
    navigation.navigate('ClientDetails', { client });
  };

  const getColorFromId = (id: number) => {
    const colors = ['#007AFF', '#FF9500', '#FF3B30', '#34C759', '#AF52DE', '#5AC8FA', '#5856D6'];
    return colors[id % colors.length];
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
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
            <Avatar style={{ backgroundColor: getColorFromId(item.id) }}>
              <AvatarText>{getInitials(item.name)}</AvatarText>
            </Avatar>
            <ClientInfo>
              <ClientName>{item.name}</ClientName>
              <ClientPhone>{item.cnpj}</ClientPhone>
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
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background-color: transparent; /* remove cor de fundo */
  border-radius: 0px; /* remove arredondamento */
  border: none; /* remove borda */
  elevation: 0; /* remove sombra no Android */
  shadow-opacity: 0; /* remove sombra no iOS */
`;

const Avatar = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const AvatarText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const ClientInfo = styled.View`
  flex: 1;
`;

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
