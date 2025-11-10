import Realm from 'realm';
import { Client } from './schemas/ClientSchema';
import { Order } from './schemas/Order';

export const getRealm = async () => {
  return await Realm.open({
    path: 'appvidya.realm',
    schema: [Client, Order],
    schemaVersion: 1,
  });
};

export { Client, Order };

