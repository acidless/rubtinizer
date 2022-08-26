import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelsService } from '../labels.service';
import { RandomColor } from '../../../utils';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss'],
})
export class AddLabelComponent implements OnInit {
  @Input() onAddLabelWindowOpened: EventEmitter<void>;

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.max(32)]),
    color: new FormControl(RandomColor()),
  });

  isOpened = false;

  constructor(private labelSerive: LabelsService) {}

  ngOnInit(): void {
    this.onAddLabelWindowOpened.subscribe(() => {
      this.openWindow();
    });
  }

  openWindow() {
    this.isOpened = true;
  }

  closeWindow() {
    this.isOpened = false;
  }

  addLabel() {
    if (this.form.status === 'VALID') {
      this.labelSerive.addLabel(this.form.value as any);
      this.closeWindow();
      this.form.setValue({ color: RandomColor(), title: '' });
    }
  }
}
