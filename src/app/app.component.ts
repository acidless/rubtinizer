import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings/settings.service';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public settingsService: SettingsService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    localStorage.setItem('date', new Date().toDateString());
  }
}
