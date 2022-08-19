import { Injectable } from '@angular/core';
import { Note } from '../../types/note';
import { ElectronService } from 'ngx-electron';
import { DatabaseService } from '../database.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  data: Array<Note> = [];

  constructor(private electronService: ElectronService, private databaseService: DatabaseService) {
    this.databaseService.whenLoaded(async () => {
      this.data = await this.databaseService.getAll('notes');
    });
  }

  get notes() {
    return this.data;
  }

  addNote(note: Note) {
    this.data.push(note as any);
    this.databaseService.setData('notes', note);
  }

  removeNote(note: Note) {
    this.data = this.data.filter((_note) => _note.timestamp !== note.timestamp);
    this.databaseService.removeData('notes', note.timestamp);
  }
}
