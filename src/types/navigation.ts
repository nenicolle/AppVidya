import { Product } from '../types/Products';
import { Client } from './client';
import { Order } from './Order';

export type RootStackParamList = {
  Home: undefined;
  //PRODUTOS ===============
  Products: undefined;
  ProductDetails: { product: Product };
  CreateProduct: undefined;
  //CLIENTES ===============
  Clients: undefined;
  ClientDetails: { client: Client };
  CreateClient: undefined;
  //PEDIDOS ===============
  Orders: undefined;
  OrderDetails: { order: Order };
  CreateOrder: { client: Client };
};
