import { Product } from '../types/Products';
import { Client } from './client';

export type RootStackParamList = {
  Home: undefined;
  //PRODUTOS ===============
  Products: undefined;
  ProductDetails: { product: Product };
  CreateProduct: undefined;
  //CLIENTES ===============
  Clients: undefined;
  CreateClient: undefined;
  ClientDetails: { client: Client };
  //PEDIDOS ===============
  Orders: undefined;
};
