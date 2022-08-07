import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private electronService: ElectronService) {}

  getData() {
    return this.electronService.ipcRenderer.sendSync('data', ['get']);
  }
}
