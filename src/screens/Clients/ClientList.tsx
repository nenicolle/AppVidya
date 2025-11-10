import React, { useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Client } from '../../database/schemas/ClientSchema';
import { Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { getColorFromId, getInitials } from '../../utils/imageCard';

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
        keyExtractor={(item) => item._id.toHexString()}
        renderItem={({ item }) => (
          <ClientItem onPress={() => handleClientPress(item)}>
            <Avatar style={{ backgroundColor: getColorFromId(item._id.toHexString().charCodeAt(0)) }}>
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
  background-color: transparent;
  border-radius: 0px;
  border: none;
  elevation: 0;
  shadow-opacity: 0;
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
