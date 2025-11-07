
import {Product} from '../types/Products'

export type RootStackParamList = {
  Home: undefined;
  //PRODUTOS ===============
  Products: undefined;
  ProductDetails: { product: Product  };
  CreateProduct: undefined;
  //CLIENTES ===============
  Clients: undefined;
  CreateClient: undefined;
  //PEDIDOS ===============
  Orders: undefined;
};