import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../todo-block/task/task.service';
import { ToDoTask } from '../../../types/task';
import { LabelsService } from '../../labels/labels.service';
import { Label } from '../../../types/label';

@Component({
  selector: 'app-change-task',
  templateUrl: './change-task.component.html',
  styleUrls: ['./change-task.component.scss'],
})
export class ChangeTaskComponent implements OnInit, OnChanges {
  @Input() editingTask: ToDoTask | undefined;
  labels: Array<Label>;

  isOpened = false;
  taskEditForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.max(64)]),
    content: new FormControl('', [Validators.max(500)]),
    notificationTime: new FormControl(''),
  });

  constructor(private taskService: TaskService, private labelService: LabelsService) {}

  ngOnInit(): void {}

  closeWindow() {
    this.isOpened = false;
  }

  changeTask() {
    if (this.taskEditForm.status === 'VALID') {
      this.taskService.changeTask({ ...this.editingTask, labels: this.labels, ...this.taskEditForm.value } as ToDoTask);
      this.isOpened = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editingTask) {
      this.isOpened = true;

      const { title, content, notificationTime } = this.editingTask;

      this.taskEditForm.setValue({ title, content, notificationTime });
      this.labels = [...this.editingTask.labels];
    }
  }

  addLabel() {
    if (this.labels.length < 10) {
      this.labels.push(this.labelService.labels[0]);
    }
  }

  removeLabel(label: Label) {
    this.labels = this.labels.filter((_label) => _label.timestamp !== label.timestamp);
  }
}
