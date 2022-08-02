import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.scss'],
})
export class MessageWindowComponent {
  constructor() {}

  @ViewChild('windowBG', { static: false })
  windowBG: ElementRef | undefined;

  @Input() isOpened = false;

  @Output() onClosed = new EventEmitter();
  close() {
    this.onClosed.emit();
  }

  currentTarget = null;

  toggleWindow(e: Event) {
    if (e.target === this.currentTarget && this.currentTarget === this.windowBG.nativeElement) {
      this.close();
    }
  }

  setTarget(target) {
    this.currentTarget = target;
  }
}
