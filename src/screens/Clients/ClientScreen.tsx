import React, { useState } from 'react';
import styled from 'styled-components/native';
import ClientsList from '../../screens/Clients/ClientList';
import NavigationBar from '../../UI/NavigationBar';
import { Client } from '../../types/client';
import { AddButton, AddButtonText } from '../../UI/Buttons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft } from 'lucide-react-native';
const mockClients: Client[] = [
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
interface ClientsListProps {
  clients: Client[];
  loading?: boolean;
  onClientPress: (client: Client) => void;
}
type ProductsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Clients'>;
const ClientsScreen = () => {
  const navigation = useNavigation<ProductsScreenNavigationProp>();
  const [clients] = useState<Client[]>(mockClients);
  const [loading] = useState(false);

  const handleClientPress = (client: Client) => {
    console.log('Cliente selecionado:', client);
  };

  return (
    <Container>
      <Header>Clientes</Header>
      <ClientsList clients={clients} loading={loading} onClientPress={handleClientPress} />
      <AddButton onPress={() => navigation.navigate('CreateClient')}>
        <AddButtonText>+</AddButtonText>
      </AddButton>
      <NavigationBar />
    </Container>
  );
};

export default ClientsScreen;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;
const Header = styled.Text`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
`;
const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  padding: 8px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;
