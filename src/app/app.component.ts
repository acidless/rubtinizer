import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    public settingsService: SettingsService
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    localStorage.setItem('date', new Date().toDateString());
  }
}
