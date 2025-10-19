import { create } from 'zustand';
import Realm from 'realm';
import { Task } from '../db/schemas';

interface TaskDTO {
  _id: string;
  title: string;
  done: boolean;
}

interface TaskState {
  tasks: TaskDTO[];
  loadTasks: (realm: Realm) => void;
  addTask: (realm: Realm, title: string) => void;
  toggleDone: (realm: Realm, _id: string) => void;
  removeTask: (realm: Realm, _id: string) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [] as TaskDTO[],

  loadTasks: realm => {
    const all = realm.objects<Task>('Task');
    const copy = all.map((task: Task) => ({
      _id: task._id,
      title: task.title,
      done: task.done,
    }));
    set({ tasks: copy });
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
