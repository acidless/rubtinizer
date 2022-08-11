import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { ToDoTask } from '../../types/task';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  currentDate = new Date();
  tasks: Array<Array<ToDoTask>> = this.initTasks();
  data: any;

  constructor(private electronService: ElectronService, private dataService: DataService) {}

  loadTasks() {
    this.data = this.dataService.getData();

    this.currentDate = new Date(localStorage.getItem('date'));
    const currentDayTaks = this.data[this.currentDate.toDateString()];

    if (currentDayTaks) {
      this.tasks = [...currentDayTaks];
    } else {
      this.data[this.currentDate.toDateString()] = this.initTasks();
      this.tasks = this.initTasks();
    }
  }

  saveTasks(date = this.currentDate) {
    const currentDateIndex = date.toDateString();

    if (!this.isTasksEmpty(this.tasks) || !this.isTasksEmpty(this.data[currentDateIndex])) {
      this.data[currentDateIndex] = [...this.tasks];
      this.electronService.ipcRenderer.send('tasks', ['save', this.data]);
    }

    localStorage.setItem('date', this.currentDate.toDateString());
  }

  copyTasksToNextDay() {
    const nextDate = new Date(this.currentDate).setDate(this.currentDate.getDate() + 1);
    this.saveTasks(new Date(nextDate));
  }

  private isTasksEmpty(tasks: Array<Array<ToDoTask>>) {
    return tasks.every((arr) => arr.length === 0);
  }

  private initTasks() {
    return [[], [], []];
  }
}
