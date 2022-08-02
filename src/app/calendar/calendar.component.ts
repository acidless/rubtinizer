import { Component, OnChanges, OnInit } from '@angular/core';
import data from '../../../data.json';
import { ToDoTask } from '../../types/task';

interface DateTasks {
  date: Date;
  tasks: Array<Array<ToDoTask>>;
}

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnChanges {
  month: number;
  year: number;
  dates: Array<Array<DateTasks | undefined>> = [[]];
  activeDate: DateTasks;

  months = [
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

  constructor() {}

  ngOnInit(): void {
    const currentDate = new Date(localStorage.getItem('date'));

    this.month = currentDate.getMonth();
    this.year = currentDate.getFullYear();
    this.ngOnChanges();
    this.setActiveDate(currentDate);
  }

  ngOnChanges(): void {
    this.dates = [[]];
    let counter = 1;
    let weekCounter = 0;

    let date = new Date(this.year, this.month, counter++);

    let day = date.getDay();
    if (!day) day = 7;

    let tasks = data[date.toDateString()];
    this.dates[0][day - 1] = { date, tasks: tasks || [[]] };

    while (true) {
      date = new Date(this.year, this.month, counter++);

      if (date.getMonth() !== this.month) {
        break;
      }

      tasks = data[date.toDateString()];
      this.dates[weekCounter].push({ date, tasks: tasks || [[]] });

      if (!date.getDay()) {
        weekCounter++;
        this.dates[weekCounter] = [];
      }
    }
  }

  monthBack() {
    if (--this.month < 0) {
      this.year--;
      this.month = 11;
    }

    this.ngOnChanges();
  }

  monthNext() {
    if (++this.month > 11) {
      this.year++;
      this.month = 0;
    }
    this.ngOnChanges();
  }

  isActiveDate(date: Date) {
    return (
      this.activeDate?.date.getDate() === date?.getDate() &&
      this.activeDate?.date.getMonth() === date?.getMonth() &&
      this.activeDate?.date.getFullYear() === date?.getFullYear()
    );
  }

  setActiveDate(date: Date) {
    this.activeDate = { date, tasks: data[date.toDateString()] || [[]] };
    localStorage.setItem('date', date.toDateString());
  }
}
