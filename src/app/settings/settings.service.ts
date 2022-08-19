import { Injectable } from '@angular/core';

export type Theme = 'dark' | 'light';

type Settings = {
  theme: Theme;
  autoDeleteInterval: number;
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingsData: Settings = { theme: 'dark', autoDeleteInterval: 7 };

  constructor() {
    const dataStr = localStorage.getItem('settings') ?? '{}';
    const data = JSON.parse(dataStr);

    if (data.theme) {
      this.settingsData.theme = data.theme;
      this.settingsData.autoDeleteInterval = data.autoDeleteInterval;
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
}
