import { View, FlatList } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/src/components/Input/Input';
import { Button } from 'react-native-paper';
import { useRealm } from '@/src/db/realm';
import { useTaskStore } from '@/src/store/useTaskStore';
import * as Styled from '@/src/views/Todo/Todo.styles';
import useAppTheme from '@/src/hooks/useAppTheme';

export const registerTaskSchema = z.object({
  newTask: z
    .string()
    .min(1, 'A tarefa deve ter pelo menos 2 caracteres')
    .max(50, 'A tarefa não pode ter mais de 50 caracteres'),
});

type RegisterTaskData = z.infer<typeof registerTaskSchema>;

export function Todo() {
  const realm = useRealm();
  const theme = useAppTheme();

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
            <Styled.TaskTitle
              onPress={() => toggleDone(realm, item._id)}
              isDone={item.done}
              theme={theme}>
              {item.title}
            </Styled.TaskTitle>
            <Button mode='contained' onPress={() => removeTask(realm, item._id)}>
              ❌
            </Button>
          </View>
        )}
      />
    </Styled.Container>
  );
}
