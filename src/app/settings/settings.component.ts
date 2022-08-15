import { Component, OnInit } from '@angular/core';
import { SettingsService, Theme } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(public settingsService: SettingsService) {}

  ngOnInit(): void {}

  setTheme(theme: Theme) {
    this.settingsService.theme = theme;
  }
}
