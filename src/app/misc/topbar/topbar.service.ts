import { Injectable } from '@angular/core';
import { ElectronService } from '../../core/services';

@Injectable({
  providedIn: 'root',
})
export class TopbarService {
  constructor(private electronService: ElectronService) {}

  windowClose() {
    this.electronService.close();
  }

  windowMinimize() {
    this.electronService.minimize();
  }

  windowMaximize() {
    this.electronService.maximize();
  }
}
