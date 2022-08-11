import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../../types/note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() note: Note;

  constructor(public noteService: NotesService) {}

  ngOnInit(): void {}
}
