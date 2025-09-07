// app/(tabs)/todo.tsx
import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input/Input';
import { Button } from 'react-native-paper';
import { useRealm, useQuery } from '@/db/realm';
import { Task } from '@/db/schemas';
import { useTaskStore } from '@/store/useTaskStore';

export const registerTaskSchema = z.object({
  newTask: z
    .string()
    .min(1, 'A tarefa deve ter pelo menos 2 caracteres')
    .max(50, 'A tarefa não pode ter mais de 50 caracteres'),
});

type RegisterTaskData = z.infer<typeof registerTaskSchema>;

export default function Todo() {
  const realm = useRealm(); // <— HOOK válido dentro do componente
  const results = useQuery<Task>('Task'); // <— Hook válido dentro do componente

  // const tasks = useTaskStore().tasks;
  const loadTasks = useTaskStore().loadTasks;
  const addTask = useTaskStore().addTask;
  const toggleDone = useTaskStore().toggleDone;
  const removeTask = useTaskStore().removeTask;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterTaskData>({
    resolver: zodResolver(registerTaskSchema),
    defaultValues: { newTask: '' },
  });

  useEffect(() => {
    loadTasks(realm);
  }, [realm]);

  const onSubmit = (data: RegisterTaskData) => {
    if (!data.newTask) return;
    addTask(realm, data.newTask);
    reset();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <Input
          name="New Task"
          identifier="newTask"
          placeholder="New Task"
          control={control}
          error={errors.newTask}
          required
          autoCapitalize="words"
          maxLength={50}
          onSubmit={handleSubmit(onSubmit)}
        />
        <Button mode="contained" loading={isSubmitting} onPress={handleSubmit(onSubmit)}>
          Adicionar
        </Button>
      </View>

      <FlatList
        data={results} // dados reativos diretos do Realm
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 }}>
            <Text
              onPress={() => toggleDone(realm, item._id)}
              style={item.done ? styles.doneText : styles.text}>
              {item.title}
            </Text>
            <Button mode="contained" onPress={() => removeTask(realm, item._id)}>
              ❌
            </Button>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 16 },
  doneText: { fontSize: 16, textDecorationLine: 'line-through', color: '#888' },
});
