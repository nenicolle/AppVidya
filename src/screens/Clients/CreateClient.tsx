import React from 'react';
import { Alert, TouchableOpacity, ScrollView, View, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { CameraIcon } from 'lucide-react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import Header from '../../UI/Header/Header';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image } from 'react-native';
import { useRealm } from '@realm/react';
import { Client } from '../../database/schemas/ClientSchema';
import { Realm } from '@realm/react';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  cnpj: yup
    .string()
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido')
    .required('CNPJ é obrigatório'),
  phone: yup.string().required('Telefone é obrigatório'),
  cep: yup
    .string()
    .matches(/^\d{5}-\d{3}$/, 'CEP inválido (ex: 00000-000)')
    .required('CEP é obrigatório'),
  state: yup.string().required('Estado é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  neighborhood: yup.string().required('Bairro é obrigatório'),
  street: yup.string().required('Endereço é obrigatório'),
  number: yup.string().required('Número é obrigatório'),
});

type FormData = yup.InferType<typeof schema>;

const estadosBrasileiros = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
] as const;

type AddressField =
  | { key: 'state'; label: 'Estado'; picker: true }
  | { key: 'city'; label: 'Cidade'; editable: false }
  | { key: 'neighborhood'; label: 'Bairro'; editable: false }
  | { key: 'street'; label: 'Endereço'; editable: false };

export default function CreateClient() {
  const [imageUri, setImageUri] = React.useState<string | null>(null);
  const [cepLoading, setCepLoading] = React.useState(false);

  const navigation = useNavigation<any>();

  const realm = useRealm();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      cnpj: '',
      phone: '',
      cep: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
    },
  });

  const cep = watch('cep');
  const state = watch('state');

  const fillAddress = (data: any) => {
    const { logradouro, bairro, localidade, uf } = data;
    setValue('street', logradouro ?? '', { shouldValidate: true, shouldDirty: true });
    setValue('neighborhood', bairro ?? '', { shouldValidate: true, shouldDirty: true });
    setValue('city', localidade ?? '', { shouldValidate: true, shouldDirty: true });
    setValue('state', uf ?? '', { shouldValidate: true, shouldDirty: true });
  };

  React.useEffect(() => {
    if (/^\d{5}-\d{3}$/.test(cep)) {
      setCepLoading(true);
      fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)
        .then((r) => r.json())
        .then((d) => {
          if (!d.erro) fillAddress(d);
        })
        .catch(() => {
          // Silencia erro de rede
        })
        .finally(() => setCepLoading(false));
    }
  }, [cep]);

  const onSubmit = (data: FormData) => {
    try {
      realm.write(() => {
        realm.create('Client', {
          _id: new Realm.BSON.ObjectId(),
          name: data.name,
          cnpj: data.cnpj,
          phone: data.phone,
          cep: data.cep,
          state: data.state,
          city: data.city,
          neighborhood: data.neighborhood,
          street: data.street,
          number: data.number,
          photoUri: imageUri || undefined,
        });
      });

      Alert.alert('Sucesso', 'Cliente cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o cliente.');
    }
  };

  const handleUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Erro', response.errorMessage || 'Erro ao selecionar imagem');
          return;
        }
        if (response.assets?.[0]?.uri) {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  const addressFields: AddressField[] = [
    { key: 'state', label: 'Estado', picker: true },
    { key: 'city', label: 'Cidade', editable: false },
    { key: 'neighborhood', label: 'Bairro', editable: false },
    { key: 'street', label: 'Endereço', editable: false },
  ];

  return (
    <Container>
      <Header title="Cadastro de Cliente" showBack />
      <ScrollContainer contentContainerStyle={{ paddingBottom: 120 }}>
        <PhotoContainer>
          <TouchableOpacity onPress={handleUpload}>
            <PhotoPlaceholder>
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : (
                <>
                  <CameraIcon size={28} color="#999" />
                  <PhotoHint>Adicionar foto</PhotoHint>
                </>
              )}
            </PhotoPlaceholder>
          </TouchableOpacity>
        </PhotoContainer>

        <FormField label="Nome" error={errors.name?.message}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                placeholder="Ex: Ana Silva"
                placeholderTextColor="#ccc"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
        </FormField>

        <FormField label="CNPJ" error={errors.cnpj?.message}>
          <Controller
            control={control}
            name="cnpj"
            render={({ field }) => (
              <MaskedInput
                mask="99.999.999/9999-99"
                placeholder="00.000.000/0000-00"
                placeholderTextColor="#ccc"
                value={field.value}
                onChangeText={field.onChange}
                keyboardType="numeric"
              />
            )}
          />
        </FormField>

        <FormField label="Telefone" error={errors.phone?.message}>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <MaskedInput
                mask="(99) 99999-9999"
                placeholder="(11) 98765-4321"
                placeholderTextColor="#ccc"
                value={field.value}
                onChangeText={field.onChange}
                keyboardType="phone-pad"
              />
            )}
          />
        </FormField>

        <FormField label="CEP" error={errors.cep?.message}>
          <CepContainer>
            <InnerMaskedInput
              mask="99999-999"
              placeholder="00000-000"
              placeholderTextColor="#ccc"
              value={watch('cep')}
              onChangeText={(text) => setValue('cep', text, { shouldValidate: true })}
              keyboardType="numeric"
              style={{ flex: 1 }}
            />
            {cepLoading && (
              <ActivityIndicator size="small" color="#007aff" style={{ marginLeft: 8 }} />
            )}
          </CepContainer>
        </FormField>

        {addressFields.map((f) => (
          <FormField key={f.key} label={f.label} error={errors[f.key]?.message}>
            <Controller
              control={control}
              name={f.key}
              render={({ field }) =>
                'picker' in f && f.picker ? (
                  <PickerContainer key={field.value}>
                    <Picker
                      selectedValue={field.value}
                      onValueChange={field.onChange}
                      style={pickerSelectStyles}
                      dropdownIconColor="#007aff"
                    >
                      <Picker.Item label="Selecione..." value="" color="#ccc" />{' '}
                      {estadosBrasileiros.map((u) => (
                        <Picker.Item key={u} label={u} value={u} />
                      ))}
                    </Picker>
                  </PickerContainer>
                ) : (
                  <Input
                    placeholder=""
                    placeholderTextColor="#ccc"
                    value={field.value}
                    onChangeText={field.onChange}
                    editable={'editable' in f ? f.editable : true}
                  />
                )
              }
            />
          </FormField>
        ))}

        <FormField label="Número" error={errors.number?.message}>
          <Controller
            control={control}
            name="number"
            render={({ field }) => (
              <Input
                placeholder="Ex: 1000"
                placeholderTextColor="#ccc"
                value={field.value}
                onChangeText={field.onChange}
                keyboardType="numeric"
              />
            )}
          />
        </FormField>
      </ScrollContainer>

      <Footer>
        <SaveButton onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
          <SaveText>{isSubmitting ? 'Salvando...' : 'Salvar Cliente'}</SaveText>
        </SaveButton>
      </Footer>
    </Container>
  );
}

// === ESTILOS ===
const Container = styled.View`
  flex: 1;
  background: #fff;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const PhotoContainer = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

const PhotoPlaceholder = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #f5f5f5;
  border: 2px dashed #ccc;
  justify-content: center;
  align-items: center;
`;
const pickerSelectStyles = {
  paddingLeft: 15,
  fontSize: 16,
  height: 65,
  color: '#ccc',
};
const PhotoHint = styled.Text`
  font-size: 12px;
  color: #999;
  margin-top: 6px;
`;

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
  padding-left: 12px;
  font-size: 16px;
  height: 40px;
  background-color: #fafafa;
  color: #000;
  placeholder-text-color: #ccc;
` as any;

const MaskedInput = styled(MaskedTextInput)`
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding-left: 12px;
  font-size: 16px;
  height: 40px;
  background-color: #fafafa;
`;
const InnerMaskedInput = styled(MaskedTextInput)`
  flex: 1;
  font-size: 16px;
  color: #000;
  padding-left: -12px;
`;
const PickerContainer = styled.View`
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  overflow: hidden;
  height: 40px;
  justify-content: center;
  background-color: #fafafa;
`;

const CepContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding-left: 12px;
  height: 40px;
  background-color: #fafafa;
`;

const ErrorText = styled.Text`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;

const Footer = styled.View`
  padding: 20px;
  background: #fff;
  border-top-width: 1px;
  border-color: #eee;
`;

const SaveButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background: #007aff;
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

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, children }) => (
  <FieldWrapper>
    <Label>{label}</Label>
    {children}
    {error && <ErrorText>{error}</ErrorText>}
  </FieldWrapper>
);
