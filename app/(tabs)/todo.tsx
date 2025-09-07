import { useTaskStore } from '@/store/useTaskStore';
import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input/Input';
import { Button } from 'react-native-paper';

export const registerTaskSchema = z.object({
  newTask: z
    .string()
    .min(1, 'A tarefa deve ter pelo menos 2 caracteres')
    .max(50, 'A tarefa não pode ter mais de 50 caracteres'),
});

type RegisterTaskData = z.infer<typeof registerTaskSchema>;

export default function Todo() {
  const { tasks, loadTasks, addTask, toggleDone, removeTask } = useTaskStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterTaskData>({
    resolver: zodResolver(registerTaskSchema),
    defaultValues: {
      newTask: '',
    },
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const onSubmit = (data: RegisterTaskData) => {
    console.log('Dados da Tarefa/Task:', data);

    if (data.newTask) {
      try {
        addTask(data.newTask);
      } catch (error) {
        console.error({ error });
      } finally {
        reset();
      }
    }
  };

  return (
    <View className="flex-1 p-4">
      <View className="flex-row mb-4">
        <Input
          name="New Task"
          identifier="newTask"
          placeholder="New Task"
          control={control}
          error={errors.newTask}
          required
          autoCapitalize="words"
          maxLength={200}
          multiline
          onSubmit={handleSubmit(onSubmit)}
        />
        <Button mode="contained" loading={isSubmitting} onPress={handleSubmit(onSubmit)}>
          Adicionar
        </Button>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between py-2">
            <Text
              onPress={() => toggleDone(item._id)}
              style={item.done ? styles.doneText : styles.text}>
              {item.title}
            </Text>
            <Button mode="contained" onPress={() => removeTask(item._id)}>
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
