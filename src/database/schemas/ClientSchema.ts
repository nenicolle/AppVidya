import { Realm } from '@realm/react';

export class Client extends Realm.Object<Client> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  cnpj!: string;
  email!: string;
  phone!: string;
  cep!: string;
  state!: string;
  city!: string;
  neighborhood!: string;
  street!: string;
  number!: string;
  photoUri?: string;

  static schema: Realm.ObjectSchema = {
    name: 'Client',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      cnpj: 'string',
      email: 'string',
      phone: 'string',
      cep: 'string',
      state: 'string',
      city: 'string',
      neighborhood: 'string',
      street: 'string',
      number: 'string',
      photoUri: 'string?',
    },
  };
}
