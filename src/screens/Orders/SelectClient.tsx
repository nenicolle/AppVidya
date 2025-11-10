import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { Client } from '../../database/schemas/ClientSchema';
import { CheckCircle, Circle } from 'lucide-react-native';
import Header from '../../UI/Header/Header';
import { useQuery } from '@realm/react';

type SelectClientNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SelectClient'>;

export default function SelectClient() {
  const navigation = useNavigation<SelectClientNavigationProp>();
  const clients = useQuery(Client).sorted('name');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleSelect = (client: Client) => {
    setSelectedClient(client);
  };

  const handleSave = () => {
    if (selectedClient) {
      navigation.navigate('CreateOrder', { client: selectedClient });
    }
  };

  return (
    <Container>
      <Header title="Selecionar Cliente" showBack />

      <FlatList
        data={Array.from(clients)}
        keyExtractor={(item) => item._id.toHexString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => {
          const isSelected = selectedClient?._id.toHexString() === item._id.toHexString();
          return (
            <ClientCard onPress={() => handleSelect(item)} activeOpacity={0.8}>
              <ClientInfo>
                <ClientName>{item.name}</ClientName>
                <ClientPhone>{item.phone}</ClientPhone>
              </ClientInfo>
              {isSelected ? (
                <CheckCircle size={24} color="#007AFF" />
              ) : (
                <Circle size={24} color="#CCC" />
              )}
            </ClientCard>
          );
        }}
      />

      <Footer>
        <SaveButton onPress={handleSave} disabled={!selectedClient}>
          <SaveText>{selectedClient ? 'Salvar' : 'Selecione um cliente'}</SaveText>
        </SaveButton>
      </Footer>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const ClientCard = styled.TouchableOpacity`
  background-color: #f4f7fb;
  border-radius: 12px;
  margin: 6px 16px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ClientInfo = styled.View`
  flex: 1;
`;

const ClientName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #222;
`;

const ClientPhone = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

const Footer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #eaeaea;
`;

const SaveButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007aff')};
  padding: 16px;
  border-radius: 10px;
  align-items: center;
`;

const SaveText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
