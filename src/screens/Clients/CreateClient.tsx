import React from 'react';
import { Alert, TouchableOpacity, ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { CameraIcon, ChevronLeft } from 'lucide-react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import Header from '../../UI/Header/Header';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  cnpj: yup
    .string()
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido')
    .required('CNPJ é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
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
  | { key: 'city'; label: 'Cidade' }
  | { key: 'neighborhood'; label: 'Bairro' }
  | { key: 'street'; label: 'Endereço' };

export default function CreateClient() {
  const navigation = useNavigation<any>();
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
      email: '',
      phone: '',
      cep: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
    },
  });
  const fillAddress = (data: any) => {
    const { logradouro, bairro, localidade, uf } = data;
    setValue('street', logradouro ?? '', { shouldValidate: true, shouldDirty: true });
    setValue('neighborhood', bairro ?? '', { shouldValidate: true, shouldDirty: true });
    setValue('city', localidade ?? '', { shouldValidate: true, shouldDirty: true });
    setValue('state', uf ?? '', { shouldValidate: true, shouldDirty: true });
  };

  const cep = watch('cep');
  React.useEffect(() => {
    if (/^\d{5}-\d{3}$/.test(cep)) {
      fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)
        .then((r) => r.json())
        .then((d) => {
          if (!d.erro) fillAddress(d);
        });
    }
  }, [cep]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    Alert.alert('Sucesso', 'Cliente cadastrado!');
    navigation.goBack();
  };

  const handleUpload = () => Alert.alert('Upload', 'Seletor de imagem');

  const addressFields: AddressField[] = [
    { key: 'state', label: 'Estado', picker: true },
    { key: 'city', label: 'Cidade' },
    { key: 'neighborhood', label: 'Bairro' },
    { key: 'street', label: 'Endereço' },
  ];

  return (
    <Container>
      <Header title="Cadastro de Cliente" showBack />
      <ScrollContainer contentContainerStyle={{ paddingBottom: 20 }}>
        <PhotoContainer>
          <TouchableOpacity onPress={handleUpload}>
            <PhotoPlaceholder>
              <CameraIcon size={28} color="#999" />
              <PhotoHint>Adicionar foto</PhotoHint>
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
              <MaskedTextInput
                mask="99.999.999/9999-99"
                placeholder="00.000.000/0000-00"
                value={field.value}
                onChangeText={field.onChange}
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  borderColor: '#e1e1e1',
                  borderRadius: 8,
                  paddingLeft: 12,
                  fontSize: 16,
                  height: 40,
                }}
              />
            )}
          />
        </FormField>

        <FormField label="Telefone" error={errors.phone?.message}>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <MaskedTextInput
                mask="(99) 99999-9999"
                placeholder="(11) 98765-4321"
                keyboardType="phone-pad"
                value={field.value}
                onChangeText={(t) => {
                  const f = t
                    .replace(/\D/g, '')
                    .replace(/(\d{2})(\d)/, '($1) $2')
                    .replace(/(\d{5})(\d)/, '$1-$2')
                    .slice(0, 15);
                  field.onChange(f);
                }}
                style={{
                  borderWidth: 1,
                  borderColor: '#e1e1e1',
                  borderRadius: 8,
                  paddingLeft: 12,
                  fontSize: 16,
                  height: 40,
                }}
              />
            )}
          />
        </FormField>

        <FormField label="CEP" error={errors.cep?.message}>
          <Controller
            control={control}
            name="cep"
            render={({ field }) => (
              <MaskedTextInput
                mask="99999-999"
                placeholder="00000-000"
                value={field.value}
                onChangeText={(t) => {
                  const f = t
                    .replace(/\D/g, '')
                    .replace(/(\d{5})(\d)/, '$1-$2')
                    .slice(0, 9);
                  field.onChange(f);
                }}
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  borderColor: '#e1e1e1',
                  borderRadius: 8,
                  paddingLeft: 12,
                  fontSize: 16,
                  height: 40,
                }}
              />
            )}
          />
        </FormField>

        {addressFields.map((f) => (
          <FormField key={f.key} label={f.label} error={errors[f.key]?.message}>
            <Controller
              control={control}
              name={f.key}
              render={({ field }) =>
                'picker' in f && f.picker ? (
                  <PickerContainer>
                    <Picker selectedValue={field.value} onValueChange={field.onChange}>
                      <Picker.Item label="Selecione..." value="" />
                      {estadosBrasileiros.map((u) => (
                        <Picker.Item key={u} label={u} value={u} />
                      ))}
                    </Picker>
                  </PickerContainer>
                ) : (
                  <Input placeholder="" value={field.value} onChangeText={field.onChange} />
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
          <SaveText>{isSubmitting ? 'Salvando...' : 'Salvar'}</SaveText>
        </SaveButton>
      </Footer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background: #fff;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
  padding-bottom: 240px;
`;
const PhotoContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;
const PhotoPlaceholder = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #f0f0f0;
  border: 2px dashed #ccc;
  justify-content: center;
  align-items: center;
`;
const PhotoHint = styled.Text`
  font-size: 12px;
  color: #999;
  margin-top: 6px;
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
`;
const PickerContainer = styled.View`
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  overflow: hidden;
  height: 40px;
`;
const ErrorText = styled.Text`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;
const Footer = styled.View`
  padding: 20px;
  background: #fff;
`;
const SaveButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background: #007aff;
  padding: 16px;
  border-radius: 10px;
  align-items: center;
  opacity: ${(p) => (p.disabled ? 0.7 : 1)};
`;
const SaveText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
const FieldWrapper = styled.View`
  margin-bottom: 16px;
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
