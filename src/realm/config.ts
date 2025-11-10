import Realm from 'realm';
import { Client } from '../database/schemas/ClientSchema';
import { Product } from '../database/schemas/Product';
import { Order } from '../database/schemas/Order';
import { OrderItem } from '../database/schemas/OrderItem';

export const realmConfig: Realm.Configuration = {
  schema: [Client, Product, Order, OrderItem],
  path: 'myrealm.realm',
  schemaVersion: 2,
  deleteRealmIfMigrationNeeded: true,
};
