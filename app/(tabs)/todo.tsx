import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input/Input';
import { Button } from 'react-native-paper';
import { useRealm } from '@/db/realm';
import { useTaskStore } from '@/store/useTaskStore';
import * as Styled from '@/styles/todo.styles';

export const registerTaskSchema = z.object({
  newTask: z
    .string()
    .min(1, 'A tarefa deve ter pelo menos 2 caracteres')
    .max(50, 'A tarefa não pode ter mais de 50 caracteres'),
});

type RegisterTaskData = z.infer<typeof registerTaskSchema>;

export default function Todo() {
  const realm = useRealm();

  const tasks = useTaskStore().tasks;
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

  const onSubmit = (data: RegisterTaskData) => {
    if (!data.newTask) return;
    addTask(realm, data.newTask);
    reset();
  };

  return (
    <Styled.Container>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <Input
          name='New Task'
          identifier='newTask'
          placeholder='New Task'
          control={control}
          error={errors.newTask}
          required
          autoCapitalize='words'
          maxLength={50}
          onSubmit={handleSubmit(onSubmit)}
        />
        <Button mode='contained' loading={isSubmitting} onPress={handleSubmit(onSubmit)}>
          Adicionar
        </Button>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 }}>
            <Text
              onPress={() => toggleDone(realm, item._id)}
              style={item.done ? styles.doneText : styles.text}>
              {item.title}
            </Text>
            <Button mode='contained' onPress={() => removeTask(realm, item._id)}>
              ❌
            </Button>
          </View>
        )}
      />
    </Styled.Container>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 16 },
  doneText: { fontSize: 16, textDecorationLine: 'line-through', color: '#888' },
});
