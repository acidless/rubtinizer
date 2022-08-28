import { Component, Input, OnInit } from '@angular/core';
import { Label } from '../../../types/label';
import { LabelsService } from '../labels.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {
  @Input() showDeleteButton = true;
  @Input() label: Label;
  @Input() onRemove?: Function;
  @Input() onClick: Function = (label: Label) => {};

  constructor(private labelsService: LabelsService) {}

  ngOnInit(): void {}

  removeLabel() {
    if (this.onRemove) {
      return this.onRemove(this.label);
    }

    this.labelsService.removeLabel(this.label);
  }
}
