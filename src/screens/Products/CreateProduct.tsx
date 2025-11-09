import React, { useState } from 'react';
import { Alert, TextInputProps, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { CameraIcon, ChevronLeft } from 'lucide-react-native';
import Header from '../../UI/Header/Header';

export default function CreateProduct() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  // const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = () => {
    if (!name || !price) {
      Alert.alert('Atenção', 'Preencha o nome e o preço do produto.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
      setIsSubmitting(false);
      navigation.goBack();
    }, 1000);
  };
  const handleUpload = () => {
    Alert.alert('Upload', 'SELETOR DE IMAGEM AQUI');
  };

  return (
    <Container>
      <Header title="Cadastro de produto" showBack />

      <Content>
        <Label>Nome</Label>
        <Input placeholder="Digite o nome do produto" value={name} onChangeText={setName} />

        <Label>Preço</Label>
        <Input placeholder="0,00" keyboardType="numeric" value={price} onChangeText={setPrice} />

        <Label>Descrição</Label>
        <TextArea
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          placeholder="Adicione uma descrição"
          value={description}
          onChangeText={setDescription}
        />

        <Label>Foto do produto</Label>
        <UploadContainer>
          <TouchableOpacity onPress={handleUpload}>
            <UploadButton>
              <CameraIcon size={24} />
              <UploadText>Faça o upload da foto</UploadText>
            </UploadButton>
          </TouchableOpacity>
          <UploadHint>JPG e PNG, somente</UploadHint>
        </UploadContainer>
      </Content>

      <Footer>
        <SaveButton onPress={handleSave} disabled={isSubmitting}>
          <SaveText>{isSubmitting ? 'Salvando...' : 'Salvar'}</SaveText>
        </SaveButton>
      </Footer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;
const Footer = styled.View`
  padding: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #000;
`;

const Input = styled.TextInput<TextInputProps>`
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 16px;
`;

const TextArea = styled.TextInput`
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  height: 100px;
  margin-bottom: 16px;
`;

const UploadContainer = styled.View`
  border: 2px dashed #ccc;
  border-radius: 12px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const UploadButton = styled.View`
  flex-direction: row;
  background-color: #007aff;
  border-radius: 8px;
  padding: 10px 16px;
  align-items: center;
`;

const UploadText = styled.Text`
  color: #fff;
  font-weight: 600;
  margin-left: 6px;
`;

const UploadHint = styled.Text`
  font-size: 12px;
  color: #999;
  margin-top: 8px;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 16px;
  border-radius: 10px;
  align-items: center;
`;

const SaveText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
