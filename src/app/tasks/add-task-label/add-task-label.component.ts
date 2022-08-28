import { Component, Input, OnInit } from '@angular/core';
import { LabelsService } from '../../labels/labels.service';
import { Label } from '../../../types/label';
import { MessageWindowBaseComponent } from '../../misc/message-window-base/message-window-base.component';
import { TaskLabelService } from '../task-forms/shared/add-label-form/task-label.service';

@Component({
  selector: 'app-add-task-label',
  templateUrl: './add-task-label.component.html',
  styleUrls: ['./add-task-label.component.scss'],
})
export class AddTaskLabelComponent extends MessageWindowBaseComponent {
  constructor(public labelService: LabelsService, private taskLabelService: TaskLabelService) {
    super();
  }

  addLabelClick(label: Label) {
    this.taskLabelService.addLabel(label);
    this.closeWindow();
  }
}
