# Regras Específicas do Projeto - Testando Libs React Native

Este documento define as regras e melhores práticas para o desenvolvimento do projeto "testando-libs", um aplicativo React Native utilizando Expo, TypeScript e várias bibliotecas específicas. Estas regras são baseadas nas documentações oficiais, melhores práticas da comunidade e princípios de clean code e clean architecture.

## Arquitetura Geral

### Estrutura de Arquivos

- Use Expo Router para navegação baseada em arquivos (file-based routing).
- Organize componentes em diretórios por funcionalidade (e.g., `components/auth/`, `components/ui/`).
- Mantenha hooks personalizados em `hooks/`.
- Use `db/` para configurações de banco de dados e schemas do Realm.
- Centralize estilos em `styles/` com temas claros e escuros.

### Clean Architecture

- **Camada de Apresentação**: Componentes UI (React Native Paper, Expo Router).
- **Camada de Aplicação**: Hooks, Zustand stores, lógica de negócio.
- **Camada de Infraestrutura**: Realm para persistência, APIs externas se aplicável.
- Evite lógica de negócio em componentes; delegue para hooks ou stores.

## Bibliotecas Específicas e Suas Regras

### 1. Expo e Expo Router

- Sempre use `expo-router` para navegação ao invés de `react-navigation` diretamente para compatibilidade com Expo.
- Defina layouts em `_layout.tsx` e use grupos como `(tabs)` para navegação tabulada.
- Para modais, use `<Stack.Screen name="modal" options={{ presentation: 'modal' }} />`.
- Consulte a documentação: [Expo Router Docs](https://docs.expo.dev/router/introduction/).

### 2. Realm Database

- Defina schemas usando classes que estendem `Realm.Object`.
- Sempre forneça valores padrão e use `constructor` para inicialização segura.
- Exemplo de schema:

  ```typescript
  export class Task extends Realm.Object<Task> {
    _id!: string;
    description!: string;
    isComplete!: boolean;

    static schema = {
      name: 'Task',
      properties: {
        _id: 'string',
        description: 'string',
        isComplete: 'bool',
      },
      primaryKey: '_id',
    };
  }
  ```

- Use `@realm/react` hooks como `useRealm` e `useQuery` para operações CRUD.
- Evite operações síncronas em componentes; use assíncronas para melhor performance.
- Para sincronização, configure `RealmProvider` no root layout.
- Práticas avançadas: Use índices para queries frequentes e monitore tamanho do arquivo Realm.
- Consulte: [Realm React Native Best Practices](https://blog.logrocket.com/realm-react-native/).

### 3. React Hook Form com Zod

- Use `react-hook-form` para gerenciamento de formulários.
- Integre com `zod` para validação usando `@hookform/resolvers`.
- Exemplo:

  ```typescript
  const schema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
  });

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  ```

- Mantenha formulários em componentes isolados e passe dados via props ou context.
- Evite lógica de validação no componente; centralize em schemas Zod.

### 4. Zustand para Gerenciamento de Estado

- Use Zustand para estado global simples (e.g., autenticação, temas).
- Estrutura stores por domínio (e.g., `store/authStore.ts`, `store/themeStore.ts`).
- Exemplo de store:

  ```typescript
  import { create } from 'zustand';

  interface AuthState {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
  }

  export const useAuthStore = create<AuthState>(set => ({
    user: null,
    login: async (email, password) => {
      // lógica de login
      set({ user: loggedUser });
    },
  }));
  ```

- Evite stores grandes; quebre em múltiplos se necessário.
- Use devtools para debugging em desenvolvimento.

### 5. React Native Paper para UI

- Use componentes do Paper para consistência (e.g., `Button`, `Card`, `TextInput`).
- Customize temas em `styles/` usando `PaperProvider`.
- Exemplo de tema:

  ```typescript
  import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

  export const LightTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#6200EE',
    },
  };
  ```

- Evite estilos inline; use `StyleSheet` ou styled-components se aplicável.

### 6. React Native Reanimated

- Use para animações performáticas em listas e gestos.
- Sempre use `useSharedValue` para valores animados e `useAnimatedStyle` para estilos.
- Exemplo básico:

  ```typescript
  const animatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: animatedValue.value }],
  }));
  ```

## Clean Code e Boas Práticas

### Princípios Gerais

- **Funções pequenas**: Mantenha funções com no máximo 20-30 linhas. Quebre em funções menores se necessário.
- **Nomes descritivos**: Use nomes claros para variáveis, funções e componentes (e.g., `handleUserLogin` ao invés de `handleClick`).
- **Comentários**: Comente código complexo, mas prefira código auto-explicativo.
- **DRY (Don't Repeat Yourself)**: Reutilize código com hooks ou componentes.
- **SOLID**: Siga princípios como Responsabilidade Única (uma função/classe faz uma coisa).

### TypeScript

- Use tipos estritos: Ative `strict: true` no `tsconfig.json`.
- Evite `any`; use tipos específicos ou genéricos.
- Use interfaces para props de componentes:
  ```typescript
  interface MyComponentProps {
    title: string;
    onPress: () => void;
  }
  ```
- Para enums, prefira union types (e.g., `type Status = 'active' | 'inactive'`).

### Estilo de Código

- Siga as regras do ESLint configurado (baseado em `universe`).
- Use Prettier para formatação automática.
- Importações: Ordene por bibliotecas externas primeiro, depois internas (use `@/` para aliases).
- Exemplo:
  ```typescript
  import React from 'react';
  import { View } from 'react-native';
  import { MyComponent } from '@/components';
  ```

### Tratamento de Erros

- Use try-catch em operações assíncronas.
- Para UI, use componentes de erro (e.g., ErrorBoundary do Expo Router).
- Log erros em desenvolvimento com `console.error` e reporte em produção.

### Performance

- Use `React.memo` para componentes que renderizam frequentemente.
- Evite renderizações desnecessárias com `useMemo` e `useCallback`.
- Para listas grandes, use `FlatList` com `keyExtractor` e otimizações.
- Monitore com Flipper ou React Native Debugger.

### Testes

- Escreva testes unitários com Jest e React Testing Library.
- Foque em lógica crítica (stores, hooks, validações).
- Use `jest-expo` para configuração Expo.

### Segurança

- Para Realm, habilite encriptação se necessário: `Realm.open({ encryptionKey: ... })`.
- Valide dados de entrada com Zod.
- Evite armazenar dados sensíveis em AsyncStorage; use MMKV ou similar se aplicável.

## Contribuição e Desenvolvimento

- Antes de submeter PR, rode `npm run lint` e `npm test`.
- Use conventional commits para mensagens de commit (e.g., `feat: add user authentication`).
- Documente mudanças significativas neste arquivo ou em `readme.md`.
- Para dúvidas, consulte documentações oficiais das bibliotecas listadas.

Estas regras evoluem com o projeto. Atualize conforme novas necessidades surgirem.
