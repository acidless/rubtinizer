import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../todo-block/task/task.service';
import { MessageWindowBaseComponent } from '../../../misc/message-window-base/message-window-base.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent extends MessageWindowBaseComponent {
  @Input() categoryIndex: number;
  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.max(64)]),
    content: new FormControl('', [Validators.max(500)]),
    notificationTime: new FormControl(''),
  });

  constructor(private taskService: TaskService) {
    super();
  }

  openWindow() {
    super.openWindow();
  }

  addTask() {
    if (this.form.status === 'VALID') {
      this.taskService.addTask({
        task: { ...this.form.value },
        index: this.categoryIndex,
      });

      this.form.reset();
      this.closeWindow();
    }
  }
}
