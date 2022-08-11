import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToDoTask } from '../../../types/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  @Output() addTaskEvent = new EventEmitter();
  @Output() onTodoBlockSetted = new EventEmitter<ElementRef>();

  @ViewChild('todo', { static: true })
  todoBlock: ElementRef | undefined;

  isOpened = false;

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.max(64)]),
    content: new FormControl('', [Validators.max(500)]),
    notificationTime: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    this.onTodoBlockSetted.emit(this.todoBlock);
  }

  openWindow() {
    this.isOpened = true;
  }

  closeWindow() {
    this.isOpened = false;
  }

  addTask() {
    if (this.form.status === 'VALID') {
      this.addTaskEvent.emit({ task: { ...this.form.value, timestamp: Date.now() }, index: this.categoryIndex });

      this.form.reset();
      this.isOpened = false;
    }
  }
}
