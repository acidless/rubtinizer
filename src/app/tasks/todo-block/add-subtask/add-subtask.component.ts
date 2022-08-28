import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubtaskService } from './subtask.service';
import { ToDoTask } from '../../../../types/task';
import { MessageWindowBaseComponent } from '../../../misc/message-window-base/message-window-base.component';

@Component({
  selector: 'app-add-subtask',
  templateUrl: './add-subtask.component.html',
  styleUrls: ['./add-subtask.component.scss'],
})
export class AddSubtaskComponent extends MessageWindowBaseComponent implements OnInit {
  task: ToDoTask | null;

  form = new FormGroup({
    content: new FormControl('', [Validators.max(64)]),
  });

  constructor(private subtaskService: SubtaskService) {
    super();
  }

  ngOnInit(): void {
    this.onOpenedEvent.subscribe((task) => {
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
}
