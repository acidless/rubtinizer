import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { NoteComponent } from './note/note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotesComponent, NoteComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class NotesModule {}
