import { Realm } from '@realm/react';
import { Client } from './ClientSchema';
import { OrderItem } from './OrderItem';

export class Order extends Realm.Object<Order> {
  _id!: Realm.BSON.ObjectId;
  client!: Client;
  items!: Realm.List<OrderItem>;
  totalValue!: number;
  productCount!: number;
  status!: string;
  createdAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Order',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      client: 'Client',
      items: 'OrderItem[]',
      totalValue: 'double',
      productCount: 'int',
      status: 'string',
      createdAt: 'date',
    },
  };
}
