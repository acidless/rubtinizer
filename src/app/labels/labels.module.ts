import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelsComponent } from './labels.component';
import { LabelComponent } from './label/label.component';
import { AddLabelComponent } from './add-label/add-label.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MiscModule } from '../misc/misc.module';

@NgModule({
  declarations: [LabelsComponent, LabelComponent, AddLabelComponent],
  imports: [CommonModule, ReactiveFormsModule, MiscModule],
  exports: [LabelComponent],
})
export class LabelsModule {}
