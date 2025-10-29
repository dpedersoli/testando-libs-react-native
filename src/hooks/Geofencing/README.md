# Geofencing Hook

Hook React para monitoramento de geofencing usando `expo-location` e `expo-task-manager`.

## Funcionalidades

- ✅ Solicitação automática de permissões (foreground + background)
- ✅ Monitoramento de múltiplas regiões geográficas
- ✅ Detecção de entrada e saída de regiões
- ✅ Gerenciamento de estado completo
- ✅ Tratamento robusto de erros
- ✅ Auto-start opcional ao abrir o app
- ✅ Cleanup automático ao desmontar

## Uso Básico

### 1. Configuração Automática (Recomendado)

O app já está configurado para iniciar o geofencing automaticamente ao abrir através do `GeofencingProvider` no `_layout.tsx`.

Para customizar as regiões, edite `src/components/GeofencingProvider.tsx`:

```typescript
const GEOFENCE_REGIONS: GeofenceRegion[] = [
  {
    identifier: 'casa',
    latitude: -19.9569229,
    longitude: -43.9722142,
    radius: 100, // metros
    notifyOnEnter: true,
    notifyOnExit: true,
  },
];
```

### 2. Uso Manual em Componente

```typescript
import { useGeofencing, GeofenceRegion } from '@/src/hooks/Geofencing/useGeoFencing';

function MyComponent() {
  const regions: GeofenceRegion[] = [
    {
      identifier: 'trabalho',
      latitude: -19.9391447,
      longitude: -43.9398734,
      radius: 200,
      notifyOnEnter: true,
      notifyOnExit: true,
    },
  ];

  const { state, startGeofencing, stopGeofencing, requestPermissions } = useGeofencing({
    regions,
    autoStart: false, // controle manual
  });

  return (
    <View>
      <Text>Status: {state.isActive ? 'Ativo' : 'Inativo'}</Text>
      <Text>Permissão: {state.hasPermission ? 'Concedida' : 'Negada'}</Text>
      {state.error && <Text>Erro: {state.error}</Text>}
      
      <Button title="Iniciar" onPress={startGeofencing} />
      <Button title="Parar" onPress={stopGeofencing} />
    </View>
  );
}
```

## API

### `useGeofencing(options)`

#### Parâmetros

- `regions` (GeofenceRegion[]): Array de regiões para monitorar
- `autoStart` (boolean, opcional): Se `true`, inicia automaticamente ao montar. Padrão: `false`
- `onEnter` (função, opcional): Callback quando entrar em uma região
- `onExit` (função, opcional): Callback quando sair de uma região

#### Retorno

```typescript
{
  state: {
    isActive: boolean;        // Se o geofencing está ativo
    hasPermission: boolean;   // Se as permissões foram concedidas
    error: string | null;     // Mensagem de erro, se houver
    lastEvent: GeofencingEvent | null; // Último evento detectado
  },
  startGeofencing: () => Promise<void>;
  stopGeofencing: () => Promise<void>;
  requestPermissions: () => Promise<boolean>;
}
```

## Tipos

### GeofenceRegion

```typescript
interface GeofenceRegion {
  identifier: string;      // ID único da região
  latitude: number;        // Latitude do centro
  longitude: number;       // Longitude do centro
  radius: number;          // Raio em metros
  notifyOnEnter: boolean;  // Notificar ao entrar
  notifyOnExit: boolean;   // Notificar ao sair
}
```

## Fluxo de Permissões

1. **Foreground Permission**: Solicitada primeiro
2. **Background Permission**: Solicitada após foreground ser concedida
3. Ambas são necessárias para geofencing funcionar

## Configuração do Projeto

O arquivo `app.json` já está configurado com:

### iOS
- `NSLocationWhenInUseUsageDescription`
- `NSLocationAlwaysAndWhenInUseUsageDescription`
- `UIBackgroundModes: ["location"]`

### Android
- `ACCESS_FINE_LOCATION`
- `ACCESS_COARSE_LOCATION`
- `ACCESS_BACKGROUND_LOCATION`

## Logs

O hook emite logs prefixados com `[Geofencing]` para facilitar debugging:

```
[Geofencing] Started successfully
[Geofencing] Entered region: casa
[Geofencing] Exited region: trabalho
[Geofencing] Stopped successfully
```

## Tratamento de Erros

Todos os erros são capturados e armazenados em `state.error`:

- Permissões negadas
- Regiões inválidas
- Falhas ao iniciar/parar
- Erros da task em background

## Boas Práticas

1. **Defina regiões razoáveis**: Raios muito pequenos (<50m) podem causar falsos positivos
2. **Limite o número de regiões**: iOS limita a 20 regiões simultâneas
3. **Teste em dispositivo real**: Geofencing não funciona bem em simuladores
4. **Monitore o consumo de bateria**: Geofencing usa GPS em background

## Exemplo Completo

```typescript
import { useGeofencing } from '@/src/hooks/Geofencing/useGeoFencing';

function GeofencingScreen() {
  const { state, startGeofencing, stopGeofencing } = useGeofencing({
    regions: [
      {
        identifier: 'home',
        latitude: -23.5505,
        longitude: -46.6333,
        radius: 100,
        notifyOnEnter: true,
        notifyOnExit: true,
      },
    ],
    autoStart: true,
  });

  useEffect(() => {
    if (state.error) {
      Alert.alert('Erro', state.error);
    }
  }, [state.error]);

  return (
    <View>
      <Text>Geofencing {state.isActive ? 'Ativo' : 'Inativo'}</Text>
      {!state.isActive && (
        <Button title="Iniciar Monitoramento" onPress={startGeofencing} />
      )}
      {state.isActive && (
        <Button title="Parar Monitoramento" onPress={stopGeofencing} />
      )}
    </View>
  );
}
```

## Troubleshooting

### Permissões não concedidas
- Verifique se o `app.json` está configurado corretamente
- Reconstrua o app após adicionar permissões
- No iOS, verifique Settings > Privacy > Location Services

### Geofencing não detecta eventos
- Teste em dispositivo real (não simulador)
- Verifique se as coordenadas estão corretas
- Aumente o raio da região para testes
- Verifique os logs do console

### App crasha ao iniciar
- Verifique se a task está definida antes do uso
- Certifique-se de que `expo-task-manager` está instalado
- Reconstrua o app com `npx expo run:android` ou `npx expo run:ios`
