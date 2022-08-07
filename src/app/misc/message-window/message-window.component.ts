import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.scss'],
})
export class MessageWindowComponent {
  @Input() isOpened = false;

  @Output() onClosed = new EventEmitter();

  @ViewChild('windowBG', { static: false })
  windowBG: ElementRef | undefined;

  currentTarget = null;

  constructor() {}

  close() {
    this.onClosed.emit();
  }

  toggleWindow(e: Event) {
    if (e.target === this.currentTarget && this.currentTarget === this.windowBG.nativeElement) {
      this.close();
    }
  }

  setTarget(target) {
    this.currentTarget = target;
  }
}
