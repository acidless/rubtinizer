import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root',
})
export class TopbarService {
  constructor(private electronService: ElectronService) {}

  windowClose() {
    this.electronService.ipcRenderer.send('window', ['close']);
  }

  windowMinimize() {
    this.electronService.ipcRenderer.send('window', ['minimize']);
  }

  windowMaximize() {
    this.electronService.ipcRenderer.send('window', ['maximize']);
  }
}
