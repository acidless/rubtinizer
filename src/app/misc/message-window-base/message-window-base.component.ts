import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-window-base',
  templateUrl: './message-window-base.component.html',
  styleUrls: ['./message-window-base.component.scss'],
})
export class MessageWindowBaseComponent implements OnInit {
  @Input() onOpenedEvent: EventEmitter<any>;

  isOpened = false;

  constructor() {}

  ngOnInit(): void {
    this.onOpenedEvent.subscribe(() => {
      this.openWindow();
    });
  }

  openWindow() {
    this.isOpened = true;
  }

  closeWindow() {
    this.isOpened = false;
  }
}
