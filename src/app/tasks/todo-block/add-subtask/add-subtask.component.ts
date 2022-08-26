import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubtaskService } from './subtask.service';
import { ToDoTask } from '../../../../types/task';

@Component({
  selector: 'app-add-subtask',
  templateUrl: './add-subtask.component.html',
  styleUrls: ['./add-subtask.component.scss'],
})
export class AddSubtaskComponent implements OnInit {
  @Input() onAddSubtaskWindowOpened: EventEmitter<ToDoTask>;
  task: ToDoTask | null;

  isOpened = false;

  form = new FormGroup({
    content: new FormControl('', [Validators.max(64)]),
  });

  constructor(private subtaskService: SubtaskService) {}

  ngOnInit(): void {
    this.onAddSubtaskWindowOpened.subscribe((task) => {
      this.task = task;
      this.openWindow();
    });
  }

  addSubtask() {
    if (this.form.status === 'VALID' && this.task) {
      this.subtaskService.addSubtask(this.task, {
        content: this.form.value.content,
      });

      this.form.reset();
      this.closeWindow();
    }
  }

  closeWindow() {
    this.isOpened = false;
  }

  openWindow() {
    this.isOpened = true;
  }
}
