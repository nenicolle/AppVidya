import Realm from 'realm';
import { realmConfig } from '../realm/config';

let realmInstance: Realm | null = null;

export const getRealm = async (): Promise<Realm> => {
  if (!realmInstance) {
    realmInstance = await Realm.open(realmConfig);
  }
  return realmInstance;
};

// Opcional: fechar só no logout ou app close
export const closeRealm = () => {
  if (realmInstance) {
    realmInstance.close();
    realmInstance = null;
  }
};
