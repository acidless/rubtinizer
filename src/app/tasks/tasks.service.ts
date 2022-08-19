import { Injectable } from '@angular/core';
import { ToDoTask } from '../../types/task';
import { DatabaseService } from '../database.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  currentDate = new Date();
  tasks: Array<Array<ToDoTask>> = this.initTasks();
  data: any;

  constructor(private databaseService: DatabaseService, private settingsService: SettingsService) {
    this.databaseService.whenLoaded(async () => {
      this.databaseService.removeDataByIndex(
        'tasks',
        'timestamp_idx',
        IDBKeyRange.upperBound(Date.now() - 1000 * 3600 * 24 * this.settingsService.settings.autoDeleteInterval)
      );
    });
  }

  async loadTasks() {
    this.databaseService.whenLoaded(async () => {
      this.currentDate = new Date(localStorage.getItem('date'));

      const result = await this.databaseService.get('tasks', this.currentDate.toDateString());
      if (!result) {
        this.tasks = this.initTasks();
        this.data = this.tasks;

        this.databaseService.setData('tasks', {
          date: this.currentDate.toDateString(),
          tasks: this.tasks,
          timestamp: this.currentDate.getTime(),
        });
      } else {
        this.tasks = result.tasks;
        this.data = result.tasks;
      }
    });
  }

  saveTasks(date = this.currentDate) {
    this.databaseService.setData('tasks', { date: date.toDateString(), tasks: this.tasks, timestamp: date.getTime() });

    localStorage.setItem('date', this.currentDate.toDateString());
  }

  copyTasksToNextDay() {
    const nextDate = new Date(this.currentDate).setDate(this.currentDate.getDate() + 1);
    this.saveTasks(new Date(nextDate));
  }

  private initTasks() {
    return [[], [], []];
  }
}
