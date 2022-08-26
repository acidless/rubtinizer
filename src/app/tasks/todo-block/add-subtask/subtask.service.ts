import { Injectable } from '@angular/core';
import { Subtask, ToDoTask } from '../../../../types/task';
import { TasksService } from '../../tasks.service';

@Injectable({
  providedIn: 'root',
})
export class SubtaskService {
  constructor(private tasksService: TasksService) {}

  addSubtask(task: ToDoTask, subtask: Subtask) {
    task.subtasks.push({ ...subtask, timestamp: Date.now(), completed: false });
    this.tasksService.saveTasks();
  }

  change(task: ToDoTask, subtask: Subtask) {
    task.subtasks = task.subtasks.map((_subtask) => {
      if (_subtask.timestamp === subtask.timestamp) {
        return subtask;
      }

      return _subtask;
    });
    this.tasksService.saveTasks();
  }
}
