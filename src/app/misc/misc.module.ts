import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageWindowComponent } from './message-window/message-window.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { MessageWindowBaseComponent } from './message-window-base/message-window-base.component';

@NgModule({
  declarations: [MessageWindowComponent, MenuComponent, TopbarComponent, MessageWindowBaseComponent],
  imports: [CommonModule, RouterModule],
  exports: [MessageWindowComponent, MenuComponent, TopbarComponent],
})
export class MiscModule {}
