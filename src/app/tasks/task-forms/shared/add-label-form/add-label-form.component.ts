import { Component, EventEmitter, OnInit } from '@angular/core';
import { TaskLabelService } from './task-label.service';

@Component({
  selector: 'app-add-label-form',
  templateUrl: './add-label-form.component.html',
  styleUrls: ['./add-label-form.component.scss'],
})
export class AddLabelFormComponent implements OnInit {
  onAddTaskLabelWindowOpened = new EventEmitter<void>();

  constructor(public taskLabelService: TaskLabelService) {}

  ngOnInit(): void {}

  onAddLabelClick() {
    this.onAddTaskLabelWindowOpened.emit();
  }
}
