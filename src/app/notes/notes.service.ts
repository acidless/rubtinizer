import { Injectable } from '@angular/core';
import data from '../../../data.json';
import { Note } from '../../types/note';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private electronService: ElectronService) {
    if (!data['notes']) {
      data['notes'] = [];
    }
  }

  get notes() {
    return data['notes'];
  }

  addNote(note: Note) {
    data['notes'].push(note as any);
    this.electronService.ipcRenderer.send('tasks', ['save', data]);
  }

  removeNote(note: Note) {
    data['notes'] = data['notes'].filter((_note) => _note.timestamp !== note.timestamp);
    this.electronService.ipcRenderer.send('tasks', ['save', data]);
  }
}
