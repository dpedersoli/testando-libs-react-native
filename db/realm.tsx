import React, { ReactNode } from 'react';
import { createRealmContext } from '@realm/react';
import { Task } from './schemas';

// Cria o contexto do Realm para React Native
const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext({
  schema: [Task],
  deleteRealmIfMigrationNeeded: true,
});

export { RealmProvider, useRealm, useQuery, useObject };

// Optional: wrapper para abstrair configuração caso queira versionamento
export const RealmWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <RealmProvider schemaVersion={1}>{children}</RealmProvider>
);
