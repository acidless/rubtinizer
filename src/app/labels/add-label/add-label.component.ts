import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelsService } from '../labels.service';
import { RandomColor } from '../../../utils';
import { MessageWindowBaseComponent } from '../../misc/message-window-base/message-window-base.component';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss'],
})
export class AddLabelComponent extends MessageWindowBaseComponent {
  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.max(32)]),
    color: new FormControl(RandomColor()),
  });

  constructor(private labelSerive: LabelsService) {
    super();
  }

  addLabel() {
    if (this.form.status === 'VALID') {
      this.labelSerive.addLabel(this.form.value as any);
      this.closeWindow();
      this.form.setValue({ color: RandomColor(), title: '' });
    }
  }
}
