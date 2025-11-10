import { Realm } from '@realm/react';
import { OrderItem } from './OrderItem';

export class Order extends Realm.Object<Order> {
  _id!: Realm.BSON.ObjectId;
  clientId!: string;
  clientName!: string;
  items!: Realm.List<OrderItem>;
  totalValue!: number;
  createdAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Order',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      clientId: 'string',
      clientName: 'string',
      items: 'OrderItem[]',
      totalValue: 'double',
      createdAt: 'date',
    },
  };
}
