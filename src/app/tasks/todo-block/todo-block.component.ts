import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToDoTask } from '../../../types/task';

@Component({
  selector: 'app-todo-block',
  templateUrl: './todo-block.component.html',
  styleUrls: ['./todo-block.component.scss'],
})
export class TodoBlockComponent implements OnInit {
  @Input() title = '';
  @Input() tasks: Array<ToDoTask> = [];
  @Input() onTaskMove = (event: any) => {};
  @Input() onTaskStopMove = (task: ToDoTask) => {};
  @Input() categoryIndex: number;

  @Output() onTodoBlockSetted = new EventEmitter<ElementRef>();

  onAddTaskWindowOpened = new EventEmitter<void>();
  onAddSubtaskWindowOpened = new EventEmitter<ToDoTask>();

  @ViewChild('todo', { static: true })
  todoBlock: ElementRef | undefined;

  constructor() {}

  ngOnInit(): void {
    this.onTodoBlockSetted.emit(this.todoBlock);
  }

  openAddTaskWindow() {
    this.onAddTaskWindowOpened.emit();
  }

  openAddSubtaskWindow(task: ToDoTask) {
    this.onAddSubtaskWindowOpened.emit(task);
  }
}
