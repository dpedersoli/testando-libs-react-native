import React, { ReactNode } from 'react';
import { createRealmContext } from '@realm/react';
import { Task } from './schemas';
import Realm from 'realm';

export const CURRENT_REALM_SCHEMA_VERSION = 8;

const migrationFunction = (oldRealm: Realm, newRealm: Realm) => {
  if (oldRealm.schemaVersion < CURRENT_REALM_SCHEMA_VERSION) {
    console.log(`MIGROOOOOU O REALM!!! para v${CURRENT_REALM_SCHEMA_VERSION}`);

    const oldTasks = oldRealm.objects<Task>('Task');
    const newTasks = newRealm.objects<Task>('Task');

    for (let i = 0; i < oldTasks.length; i++) {
      // newTasks[i].title = 'MIGROOOOOU O REALM!!! para v4';
    }
  }
};

const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext();

export { useRealm, useQuery, useObject };

export function RealmWrapper({ children }: { children: ReactNode }) {
  return (
    <RealmProvider
      schema={[Task]}
      schemaVersion={CURRENT_REALM_SCHEMA_VERSION}
      onMigration={migrationFunction}>
      {children}
    </RealmProvider>
  );
}
