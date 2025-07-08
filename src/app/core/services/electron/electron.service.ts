import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ElectronService {
  isElectron(): boolean {
    return !!window?.electronAPI;
  }

  minimize() {
    window.electronAPI.windowAction('minimize');
  }

  maximize() {
    window.electronAPI.windowAction('maximize');
  }

  close() {
    window.electronAPI.windowAction('close');
  }

  notify(title: string) {
    window.electronAPI.showNotification(title);
  }

  autoLaunch(enable: boolean) {
    window.electronAPI.setAutoLaunch(enable);
  }
}
