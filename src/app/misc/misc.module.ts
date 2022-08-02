import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageWindowComponent } from './message-window/message-window.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MessageWindowComponent, MenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [MessageWindowComponent, MenuComponent],
})
export class MiscModule {}
