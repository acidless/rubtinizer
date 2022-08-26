import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  @Input() categoryIndex: number;
  @Input() onAddTaskWindowOpened: EventEmitter<void>;

  isOpened = false;

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.max(64)]),
    content: new FormControl('', [Validators.max(500)]),
    notificationTime: new FormControl(''),
  });

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.onAddTaskWindowOpened.subscribe(() => {
      this.openWindow();
    });
  }

  openWindow() {
    this.isOpened = true;
  }

  closeWindow() {
    this.isOpened = false;
  }

  addTask() {
    if (this.form.status === 'VALID') {
      this.taskService.addTask({
        task: this.form.value,
        index: this.categoryIndex,
      });

      this.form.reset();
      this.closeWindow();
    }
  }
}
