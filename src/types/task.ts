import { Note } from './note';

export type ToDoTask = Note & {
  title: string;
  notificationTime: string;
};
