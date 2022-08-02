import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'tasks-menu',
  templateUrl: './tasks-menu.component.html',
  styleUrls: ['./tasks-menu.component.scss'],
})
export class TasksMenuComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  isOpened = false;

  ngOnInit(): void {}

  toggle() {
    this.isOpened = !this.isOpened;
  }
}
