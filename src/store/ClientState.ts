// store/clientSlice.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

interface ClientState {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
}

const initialState: ClientState = {
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
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClient(state, action: PayloadAction<Partial<ClientState>>) {
      return { ...state, ...action.payload };
    },
    resetClient() {
      return initialState;
    },
  },
});

export const { setClient, resetClient } = clientSlice.actions;
export default clientSlice.reducer;
