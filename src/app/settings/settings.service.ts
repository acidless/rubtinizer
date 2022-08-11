import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public mTheme: 'dark' | 'light' = 'dark';

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
