import { Realm } from '@realm/react';
import { Product } from './Product';

export class OrderItem extends Realm.Object<OrderItem> {
  _id!: Realm.BSON.ObjectId;
  product!: Product;
  quantity!: number;
  unitPrice!: number;
  subtotal!: number;

  static schema: Realm.ObjectSchema = {
    name: 'OrderItem',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      product: 'Product',
      quantity: 'int',
      unitPrice: 'double',
      subtotal: 'double',
    },
  };
}
