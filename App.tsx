import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { RealmProvider } from '@realm/react';
import { realmConfig } from './src/realm/config';

export default function App() {
  return (
    <RealmProvider {...realmConfig}>
      <AppNavigator />
    </RealmProvider>
  );
}
