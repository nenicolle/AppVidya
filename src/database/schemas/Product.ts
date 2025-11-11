import { Realm } from '@realm/react';

export class Product extends Realm.Object<Product> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  price!: number;
  code!: string;
  image?: string;
  description!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Product',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      price: 'double',
      code: 'string',
      image: 'string?',
      description: 'string',
    },
  };
}
