import { Injectable } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ToDoTask } from '../../types/task';

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

interface DateTasks {
  date: Date;
  tasks: Array<Array<ToDoTask>>;
}

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  year: number;
  dates: Array<Array<DateTasks | undefined>> = [[]];
  activeDate: DateTasks;
  data: any;

  private _month: number;

  constructor(private databaseService: DatabaseService) {}

  get month() {
    return months[this._month];
  }

  loadTasksData() {
    this.databaseService.whenLoaded(async () => {
      this.data = await this.databaseService.getAll('tasks');

      const currentDate = new Date(localStorage.getItem('date'));

      this._month = currentDate.getMonth();
      this.year = currentDate.getFullYear();
      this.onChange();
      this.setActiveDate(currentDate);
    });
  }

  onChange() {
    this.dates = [[]];
    let counter = 1;
    let weekCounter = 0;

    let date = new Date(this.year, this._month, counter++);

    let day = date.getDay();
    if (!day) day = 7;

    let tasks = this.getTasksByDateString(date.toDateString());
    this.dates[0][day - 1] = { date, tasks: tasks || [[]] };

    while (true) {
      date = new Date(this.year, this._month, counter++);

      if (date.getMonth() !== this._month) {
        break;
      }

      tasks = this.getTasksByDateString(date.toDateString());
      this.dates[weekCounter].push({ date, tasks: tasks || [[]] });

      if (!date.getDay()) {
        weekCounter++;
        this.dates[weekCounter] = [];
      }
    }
  }

  monthBack() {
    if (--this._month < 0) {
      this.year--;
      this._month = 11;
    }

    this.onChange();
  }

  monthNext() {
    if (++this._month > 11) {
      this.year++;
      this._month = 0;
    }
    this.onChange();
  }

  isActiveDate(date: Date) {
    return (
      this.activeDate?.date.getDate() === date?.getDate() &&
      this.activeDate?.date.getMonth() === date?.getMonth() &&
      this.activeDate?.date.getFullYear() === date?.getFullYear()
    );
  }

  setActiveDate(date: Date) {
    this.activeDate = { date, tasks: this.getTasksByDateString(date.toDateString()) };
    localStorage.setItem('date', date.toDateString());
  }

  getTasksByDateString(date: string) {
    const data = this.data.filter((item) => item.date === date);
    if (data.length) {
      return data[0].tasks;
    }

    return [[]];
  }
}
