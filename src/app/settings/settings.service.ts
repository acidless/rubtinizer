import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

export type Theme = 'dark' | 'light';

type Settings = {
  theme: Theme;
  autoDeleteInterval: number;
  autoLaunch: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingsData: Settings = { theme: 'dark', autoDeleteInterval: 7, autoLaunch: true };

  constructor(private electronService: ElectronService) {
    const dataStr = localStorage.getItem('settings') ?? '{}';
    const data = JSON.parse(dataStr);

    if (data.theme) {
      this.settingsData = data;
      this.electronService.ipcRenderer.send('auto-launch', data.autoLaunch);
    }
  }

  get settings() {
    return this.settingsData;
  }

  set theme(value) {
    this.settingsData.theme = value;
    localStorage.setItem('settings', JSON.stringify({ ...this.settingsData, theme: this.settingsData.theme }));
  }

  set autodeleteInterval(value) {
    this.settingsData.autoDeleteInterval = value;

    localStorage.setItem(
      'settings',
      JSON.stringify({ ...this.settingsData, autoDeleteInterval: this.settingsData.autoDeleteInterval })
    );
  }

  set autoLaunchValue(value) {
    this.settingsData.autoLaunch = value;
    this.electronService.ipcRenderer.send('auto-launch', value);

    localStorage.setItem(
      'settings',
      JSON.stringify({ ...this.settingsData, autoLaunch: this.settingsData.autoLaunch })
    );
  }
}
