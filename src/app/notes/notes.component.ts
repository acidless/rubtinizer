import { Component, OnInit } from '@angular/core';
import { Note } from '../../types/note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  note: '';

  constructor(public noteService: NotesService) {}

  ngOnInit(): void {}

  addNote() {
    const value = this.note.trim();

    if (value) {
      this.noteService.addNote({ content: value, timestamp: Date.now() });
      this.note = '';
    }
  }
}
