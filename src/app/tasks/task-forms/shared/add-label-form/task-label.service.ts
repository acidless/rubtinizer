import { Injectable } from '@angular/core';
import { Label } from '../../../../../types/label';

@Injectable({
  providedIn: 'root',
})
export class TaskLabelService {
  labels: Array<Label> = [];

  constructor() {}

  addLabel(label: Label) {
    const labelExists = this.labels.some((_label) => _label.timestamp === label.timestamp);

    if (this.labels.length < 10 && !labelExists) {
      this.labels.push(label);
    }
  }

  removeLabel(label: Label) {
    this.labels = this.labels.filter((_label) => _label.timestamp !== label.timestamp);
  }
}
