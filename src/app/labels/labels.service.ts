import { Injectable } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Label } from '../../types/label';

@Injectable({
  providedIn: 'root',
})
export class LabelsService {
  private data: Array<Label> = [];

  constructor(private databaseService: DatabaseService) {
    this.databaseService.whenLoaded(async () => {
      this.data = await this.databaseService.getAll('labels');
    });
  }

  get labels() {
    return this.data;
  }

  addLabel(label: Label) {
    label.timestamp = Date.now();

    this.data.push(label);
    this.databaseService.setData('labels', label);
  }

  removeLabel(label: Label) {
    this.data = this.data.filter((_label) => _label.timestamp !== label.timestamp);
    this.databaseService.removeData('labels', label.timestamp);
  }
}
