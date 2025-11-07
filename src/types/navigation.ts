
export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export type RootStackParamList = {
  Home: undefined;
  Products: undefined;
  ProductDetails: { product: Product  };
  CreateProduct: undefined;
  Clients: undefined;
  Orders: undefined;
};