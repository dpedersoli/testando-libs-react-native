// src/store/useTaskStore.ts
import { create } from 'zustand';
import Realm from 'realm';
import { Task } from '@/db/schemas';

interface TaskState {
  tasks: Realm.Results<Task> | Task[];
  loadTasks: (realm: Realm) => void;
  addTask: (realm: Realm, title: string) => void;
  toggleDone: (realm: Realm, _id: string) => void;
  removeTask: (realm: Realm, _id: string) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  loadTasks: (realm) => {
    const all = realm.objects<Task>('Task');
    set({ tasks: all });
  },

  addTask: (realm, title) => {
    realm.write(() => {
      realm.create('Task', {
        _id: new Realm.BSON.ObjectId().toHexString(),
        title,
        done: false,
      });
    });
  },

  toggleDone: (realm, _id) => {
    realm.write(() => {
      const obj = realm.objectForPrimaryKey<Task>('Task', _id);
      if (obj) obj.done = !obj.done;
    });
  },

  removeTask: (realm, _id) => {
    realm.write(() => {
      const obj = realm.objectForPrimaryKey<Task>('Task', _id);
      if (obj) realm.delete(obj);
    });
  },
}));
