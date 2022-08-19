import { Component, Input, OnInit } from '@angular/core';
import { SubtaskService } from '../../add-subtask/subtask.service';
import { Subtask, ToDoTask } from '../../../../../types/task';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss'],
})
export class SubtaskComponent implements OnInit {
  @Input() subtask: Subtask;
  @Input() task: ToDoTask;

  constructor(private subtaskService: SubtaskService) {}

  ngOnInit(): void {}

  changeTask() {
    this.subtask.completed = !this.subtask.completed;
    this.subtaskService.change(this.task, this.subtask);
  }
}
