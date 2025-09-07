import React, { ReactNode } from 'react';
import { createRealmContext } from '@realm/react';
import { Task } from './schemas';

const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext({
  schema: [Task],
  deleteRealmIfMigrationNeeded: true,
});

export { useRealm, useQuery, useObject };

export function RealmWrapper({ children }: { children: ReactNode }) {
  return <RealmProvider schemaVersion={1}>{children}</RealmProvider>;
}
