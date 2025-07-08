import { Injectable } from '@angular/core';
import { TasksService } from './tasks/tasks.service';
import { ElectronService } from './core/services';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private tasksService: TasksService, private electronService: ElectronService) {
    setInterval(() => {
      if (this.tasksService.currentDate.toDateString() === new Date().toDateString()) {
        this.tasksService.tasks[0].forEach((task) => {
          if (task.notificationTime) {
            if (new Date().toLocaleTimeString().substring(0, 5) === task.notificationTime) {
              this.electronService.notify(task.title);
            }
          }
        });
      }
    }, 1000 * 60);
  }
}
