import React, { useState } from 'react';
import { Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CameraIcon } from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Header from '../../UI/Header/Header';
import Realm from 'realm';
import { Product } from '../../database/schemas/Product';
import { useRealm } from '@realm/react';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  price: yup
    .number()
    .typeError('Preço deve ser um número')
    .positive('Preço deve ser positivo')
    .required('Preço é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
});

type FormData = yup.InferType<typeof schema>;

export default function CreateProduct() {
  const navigation = useNavigation<any>();
  const realm = useRealm(); // ← useRealm() aqui
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', price: undefined, description: '' },
  });

  const onSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const lastProduct = realm.objects<Product>('Product').sorted('code', true)[0];
      const nextNumber = lastProduct ? parseInt(lastProduct.code.split('-')[1]) + 1 : 1;
      const code = `PROD-${String(nextNumber).padStart(3, '0')}`;

      realm.write(() => {
        realm.create('Product', {
          _id: new Realm.BSON.ObjectId(),
          name: control._formValues.name,
          code,
          price: control._formValues.price,
          description: control._formValues.description,
          image: imageUri || undefined,
        });
      });

      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      Alert.alert('Erro', 'Não foi possível salvar o produto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpload = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8, includeBase64: false }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Erro', response.errorMessage || 'Erro ao selecionar imagem');
        return;
      }
      if (response.assets?.[0]?.uri) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <Container>
      <Header title="Cadastro de Produto" showBack />

      <ScrollContainer contentContainerStyle={{ paddingBottom: 100 }}>
        <PhotoSection>
          <TouchableOpacity onPress={handleUpload}>
            <PhotoPlaceholder>
              {imageUri ? (
                <PreviewImage source={{ uri: imageUri }} resizeMode="cover" />
              ) : (
                <>
                  <CameraIcon size={32} color="#999" />
                  <PhotoHint>Adicionar foto</PhotoHint>
                </>
              )}
            </PhotoPlaceholder>
          </TouchableOpacity>
          <UploadHint>JPG ou PNG • Máximo 5MB</UploadHint>
        </PhotoSection>

        <FormField label="Nome" error={errors.name?.message}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                placeholder="Ex: Camiseta Algodão"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
        </FormField>

        <FormField label="Preço" error={errors.price?.message}>
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <Input
                placeholder="0,00"
                keyboardType="numeric"
                value={field.value?.toString() || ''}
                onChangeText={(text) => {
                  const num = parseFloat(text.replace(',', '.'));
                  field.onChange(isNaN(num) ? '' : num);
                }}
              />
            )}
          />
        </FormField>

        <FormField label="Descrição" error={errors.description?.message}>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextArea
                multiline
                numberOfLines={4}
                placeholder="Descreva o produto..."
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
        </FormField>
      </ScrollContainer>

      <Footer>
        <SaveButton onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
          <SaveText>{isSubmitting ? 'Salvando...' : 'Salvar Produto'}</SaveText>
        </SaveButton>
      </Footer>
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const PhotoSection = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

const PhotoPlaceholder = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const PreviewImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const PhotoHint = styled.Text`
  font-size: 13px;
  color: #999;
  margin-top: 6px;
`;

const UploadHint = styled.Text`
  font-size: 12px;
  color: #999;
  margin-top: 8px;
`;

const FormField: React.FC<{ label: string; error?: string; children: React.ReactNode }> = ({
  label,
  error,
  children,
}) => (
  <FieldWrapper>
    <Label>{label}</Label>
    {children}
    {error && <ErrorText>{error}</ErrorText>}
  </FieldWrapper>
);

const FieldWrapper = styled.View`
  margin-bottom: 16px;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #000;
`;

const Input = styled.TextInput`
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  background-color: #fafafa;
`;

const TextArea = styled.TextInput`
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  height: 100px;
  text-align-vertical: top;
  background-color: #fafafa;
`;

const ErrorText = styled.Text`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;

const Footer = styled.View`
  padding: 20px;
  background-color: #fff;
  border-top-width: 1px;
  border-color: #eee;
`;

const SaveButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: #007aff;
  padding: 16px;
  border-radius: 10px;
  align-items: center;
  opacity: ${(p) => (p.disabled ? 0.6 : 1)};
`;

const SaveText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
