import { Pipe, PipeTransform } from '@angular/core';
import { ToDoTask } from '../../types/task';

@Pipe({
  name: 'tasksFilter',
})
export class TasksFilterPipe implements PipeTransform {
  transform(value: Array<ToDoTask>, search: string): Array<ToDoTask> {
    const searchLower = search.trim().toLowerCase();

    if (!searchLower) {
      return value;
    }

    return value.filter(
      (task) => task.title.toLowerCase().includes(searchLower) || task.content.toLowerCase().includes(searchLower)
    );
  }
}
