import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { ToDoTask } from '../../../../types/task';

interface OnMouseEventParams {
  event: MouseEvent;
  taskRect: DOMRect;
  categoryIndex: number;
}

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  @Output() onMoveEvent = new EventEmitter<OnMouseEventParams>();
  @Output() onStopMoveEvent = new EventEmitter<ToDoTask>();

  @Input()
  title: string;
  @Input() content: string;
  @Input() timestamp: number;
  @Input() categoryIndex: number;

  @ViewChild('task', { static: false })
  taskDiv: ElementRef | undefined;

  isMoving = false;
  baseRect: DOMRect;

  constructor() {}

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }

  ngOnInit(): void {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseDown(event) {
    event.preventDefault();
    this.isMoving = true;
    this.baseRect = this.taskDiv.nativeElement.getBoundingClientRect();

    this.baseRect.x += event.x - this.baseRect.x;
    this.baseRect.y += event.y - this.baseRect.y;
  }

  onMouseUp(event) {
    if (this.isMoving) {
      event.preventDefault();
      this.isMoving = false;
      this.taskDiv.nativeElement.style.transform = 'none';
      this.onStopMoveEvent.emit({ title: this.title, content: this.content, timestamp: this.timestamp });
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.isMoving) {
      this.taskDiv.nativeElement.style.transform = `rotateZ(-3deg) translate(${event.x - this.baseRect.x}px, ${
        event.y - this.baseRect.y
      }px)`;

      this.onMoveEvent.emit({ event, taskRect: this.baseRect, categoryIndex: this.categoryIndex });
    }
  }
}
