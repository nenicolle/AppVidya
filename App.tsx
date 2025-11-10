import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { RealmProvider, createRealmContext } from '@realm/react';
import { Order } from './src/database/schemas/Order';
import { Client } from './src/database/schemas/ClientSchema';

const { RealmProvider: MyRealmProvider } = createRealmContext({
  schema: [Client, Order],
  schemaVersion: 1,
});

export default function App() {
  return (
    <MyRealmProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AppNavigator />
    </MyRealmProvider>
  );
}
