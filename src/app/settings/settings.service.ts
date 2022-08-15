import { Injectable } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public mTheme: Theme = 'dark';

  constructor() {
    const dataStr = localStorage.getItem('settings') ?? '{}';
    const data = JSON.parse(dataStr);

    if (data.theme) {
      this.theme = data.theme;
    }
  }

  get theme() {
    return this.mTheme;
  }

  set theme(value) {
    this.mTheme = value;
    localStorage.setItem('settings', JSON.stringify({ theme: this.theme }));
  }
}
