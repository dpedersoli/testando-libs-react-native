import React, { ReactNode, useEffect } from 'react';
import { createRealmContext } from '@realm/react';
import { Task } from './schemas';
import Realm from 'realm';
import { useTaskStore } from '@/store/useTaskStore';

export const CURRENT_REALM_SCHEMA_VERSION = 10;

const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext();

function migrationFunction(oldRealm: Realm, newRealm: Realm) {
  if (oldRealm.schemaVersion < CURRENT_REALM_SCHEMA_VERSION) {
    console.log(`MIGROOOOOU O REALM!!! para v${CURRENT_REALM_SCHEMA_VERSION}`);

    const oldTasks = oldRealm.objects<Task>('Task');
    const newTasks = newRealm.objects<Task>('Task');

    for (let i = 0; i < oldTasks.length; i++) {
      // newTasks[i].title = 'MIGROOOOOU O REALM!!! para v4';
    }
  }
}

function RealmListener() {
  const realm = useRealm();
  const loadTasks = useTaskStore().loadTasks;

  useEffect(() => {
    if (!realm) return;

    const tasksResults = realm.objects<Task>('Task');

    const listener = () => {
      loadTasks(realm);
    };

    tasksResults.addListener(listener);

    loadTasks(realm);

    return () => {
      tasksResults.removeListener(listener);
    };
  }, [realm, loadTasks]);

  return null;
}

export function RealmWrapper({ children }: { children: ReactNode }) {
  return (
    <RealmProvider
      schema={[Task]}
      schemaVersion={CURRENT_REALM_SCHEMA_VERSION}
      onMigration={migrationFunction}>
      <RealmListener />
      {children}
    </RealmProvider>
  );
}

export { useRealm, useQuery, useObject };
