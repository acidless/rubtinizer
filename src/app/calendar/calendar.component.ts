import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(public calendarService: CalendarService, private router: Router) {}

  ngOnInit(): void {
    this.calendarService.loadTasksData();
  }

  toDateTasks(date: Date) {
    this.calendarService.setActiveDate(date);
    this.router.navigate(['/']);
  }
}
