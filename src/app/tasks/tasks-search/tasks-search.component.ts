import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tasks-search',
  templateUrl: './tasks-search.component.html',
  styleUrls: ['./tasks-search.component.scss'],
})
export class TasksSearchComponent implements OnInit {
  @Output() onSearchChange = new EventEmitter<string>();

  searchStr = '';

  constructor() {}

  ngOnInit(): void {}

  onValueChange() {
    this.onSearchChange.emit(this.searchStr);
  }
}
