import { Realm } from '@realm/react';

export class Order extends Realm.Object<Order> {
  _id!: Realm.BSON.ObjectId;
  clientId!: string;
  clientName!: string;
  totalValue!: number;
  createdAt!: Date;
  productCount!: number;

  static schema: Realm.ObjectSchema = {
    name: 'Order',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      clientId: 'string',
      clientName: 'string',
      totalValue: 'double',
      createdAt: 'date',
      productCount: { type: 'int', default: 0 },
    },
  };
}

