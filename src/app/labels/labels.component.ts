import { Component, EventEmitter, OnInit } from '@angular/core';
import { LabelsService } from './labels.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss'],
})
export class LabelsComponent implements OnInit {
  onAddLabelWindowOpened = new EventEmitter<void>();

  constructor(public labelSerive: LabelsService) {}

  ngOnInit(): void {}

  openAddLabelWindow() {
    this.onAddLabelWindowOpened.emit();
  }
}
