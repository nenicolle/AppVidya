import React from 'react';
import styled from 'styled-components/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useQuery } from '@realm/react';
import Realm from 'realm';
import { Client } from '../../database/schemas/ClientSchema';
import { RootStackParamList } from '../../types/navigation';
import Header from '../../UI/Header/Header';

type ClientDetailsRouteProp = RouteProp<RootStackParamList, 'ClientDetails'>;

const ClientDetails = () => {
  const route = useRoute<ClientDetailsRouteProp>();
  const { clientId } = route.params || {};

  const client = useQuery(Client).filtered(
    '_id == $0',
    clientId ? new Realm.BSON.ObjectId(clientId) : null,
  )[0];
  if (!client) return null;

  return (
    <Container>
      <Header title={`${client.name}`} showBack />
      <Content>
        <Section>
          <InfoRow>
            <Label>CNPJ</Label>
            <Value>{client.cnpj}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Telefone</Label>
            <Value>{client.phone}</Value>
          </InfoRow>
          <InfoRow>
            <Label>CEP</Label>
            <Value>{client.cep}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Estado</Label>
            <Value>{client.state}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Cidade</Label>
            <Value>{client.city}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Bairro</Label>
            <Value>{client.neighborhood}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Endereço</Label>
            <Value>{client.street}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Número</Label>
            <Value>{client.number}</Value>
          </InfoRow>
        </Section>
      </Content>
    </Container>
  );
};

export default ClientDetails;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 4px;
`;

const HeaderTitle = styled.Text`
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-right: 26px;
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: 15px;
`;

const ClientHeader = styled.View`
  align-items: center;
  padding: 24px 20px 16px;
`;

const Section = styled.View`
  padding: 0 20px;
`;

const InfoRow = styled.View`
  margin-bottom: 16px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
  font-weight: bold;
`;

const Value = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: 300;
`;
