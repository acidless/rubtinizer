import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToDoTask } from '../../../types/task';

@Component({
  selector: 'todo-block',
  templateUrl: './todo-block.component.html',
  styleUrls: ['./todo-block.component.scss'],
})
export class TodoBlockComponent implements OnInit {
  @Input() title = '';
  @Input() tasks: Array<ToDoTask> = [];
  @Input() onTaskMove = (event: any) => {};
  @Input() onTaskStopMove = () => {};
  @Input() categoryIndex: number;

  @ViewChild('todo', { static: true })
  todoBlock: ElementRef | undefined;

  @Output()
  addTaskEvent = new EventEmitter();

  @Output()
  onTodoBlockSetted = new EventEmitter<ElementRef>();

  constructor() {}

  ngOnInit(): void {
    this.onTodoBlockSetted.emit(this.todoBlock);
  }

  isOpened = false;
  taskTitleToAdd = '';
  taskContentToAdd = '';

  openWindow() {
    this.isOpened = true;
  }

  closeWindow() {
    this.isOpened = false;
  }

  addTask() {
    const title = this.taskTitleToAdd.trim();
    const content = this.taskContentToAdd.trim();

    if (title) {
      this.addTaskEvent.emit({ task: { title, content, timestamp: Date.now() }, index: this.categoryIndex });

      this.taskTitleToAdd = '';
      this.taskContentToAdd = '';
      this.isOpened = false;
    }
  }
}
