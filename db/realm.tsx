import React, { ReactNode } from 'react';
import { createRealmContext } from '@realm/react';
import { Task } from './schemas';
import { Realm as RealmTypes } from 'realm';

export const CURRENT_REALM_SCHEMA_VERSION = 2;

const realmConfig = {
  schema: [Task],
  // deleteRealmIfMigrationNeeded: true, // somente para dev ou ambientes que não precisa persistir os dados pós "migration"
  schemaVersion: CURRENT_REALM_SCHEMA_VERSION,
  migration: (oldRealm: RealmTypes, newRealm: RealmTypes) => {
    if (oldRealm.schemaVersion < CURRENT_REALM_SCHEMA_VERSION) {
      const oldTasks = oldRealm.objects<Task>('Task');
      const newTasks = newRealm.objects<Task>('Task');

      for (let i = 0; i < oldTasks.length; i++) {
        // Copia os dados existentes e define valor padrão para a nova propriedade

        newTasks[i].title = 'MIGROOOOOU O REALM!!!'; // ou null, ou qualquer valor default
      }
    }
  },
};

const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext(realmConfig);

export { useRealm, useQuery, useObject };

export function RealmWrapper({ children }: { children: ReactNode }) {
  return <RealmProvider>{children}</RealmProvider>;
}
