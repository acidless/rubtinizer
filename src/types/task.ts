import { Note } from './note';

export type ToDoTask = Note & {
  title: string;
  notificationTime: string;
  subtasks: Array<Subtask>;
};

export type Subtask = Note & {
  completed?: boolean;
};
