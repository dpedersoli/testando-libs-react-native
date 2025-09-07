import Realm from 'realm';

export class Task extends Realm.Object<Task> {
  _id!: string;
  title!: string;
  done!: boolean;

  static schema: Realm.ObjectSchema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      title: 'string',
      done: { type: 'bool', default: false },
    },
  };
}
