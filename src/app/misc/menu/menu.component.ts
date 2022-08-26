import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isTaskLinkOpened = false;

  constructor() {}

  ngOnInit(): void {}

  toggleTaskList(event) {
    event.preventDefault();
    event.stopPropagation();

    this.isTaskLinkOpened = !this.isTaskLinkOpened;
  }
}
