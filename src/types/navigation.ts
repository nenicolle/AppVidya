export type RootStackParamList = {
  Home: undefined;

  // PRODUTOS
  Products: undefined;
  ProductDetails: { productId: string };
  CreateProduct: undefined;

  // CLIENTES
  Clients: undefined;
  ClientDetails: { clientId: string };
  CreateClient: undefined;

  // PEDIDOS
  Orders: undefined;
  OrderDetails: { orderId: string };
  CreateOrder: { clientId: string } | undefined;
  SelectClient: undefined;
};
