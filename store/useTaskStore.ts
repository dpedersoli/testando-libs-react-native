import { create } from 'zustand';
import Realm from 'realm';
import { useRealm, useQuery } from '../db/realm';
import { Task as RealmTask } from '../db/schemas'; // agora importa sua classe

interface TaskState {
  tasks: Realm.Results<RealmTask>;
  loadTasks: () => void;
  addTask: (title: string) => void;
  toggleDone: (_id: string) => void;
  removeTask: (_id: string) => void;
}

export const useTaskStore = create<TaskState>((set, get) => {
  const realm = useRealm();
  const allTasks = useQuery<RealmTask>('Task');

  return {
    tasks: allTasks,

    loadTasks: () => {
      // Não é necessário recarregar manualmente, já que useQuery fornece resultados reativos
      set({ tasks: allTasks });
    },

    addTask: (title) => {
      realm.write(() => {
        realm.create('Task', {
          _id: new Realm.BSON.ObjectId().toHexString(),
          title,
          done: false,
        });
      });
    },

    toggleDone: (_id) => {
      realm.write(() => {
        const task = realm.objectForPrimaryKey<RealmTask>('Task', _id);
        if (task) task.done = !task.done;
      });
    },

    removeTask: (_id) => {
      realm.write(() => {
        const task = realm.objectForPrimaryKey<RealmTask>('Task', _id);
        if (task) realm.delete(task);
      });
    },
  };
});
