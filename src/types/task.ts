import { Note } from './note';
import { Label } from './label';

export type ToDoTask = Note & {
  title: string;
  notificationTime: string;
  subtasks: Array<Subtask>;
  labels: Array<Label>;
};

export type Subtask = Note & {
  completed?: boolean;
};
