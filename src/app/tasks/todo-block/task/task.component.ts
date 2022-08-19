import {
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Input } from '@angular/core';
import { ToDoTask } from '../../../../types/task';
import { TaskService } from './task.service';

interface OnMouseEventParams {
  event: MouseEvent;
  taskRect: DOMRect;
  taskCategoryIndex: number;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input() task: ToDoTask;
  @Input() categoryIndex: number;
  @Input() openAddSubtaskWindow: Function;

  @Output() onMoveEvent = new EventEmitter<OnMouseEventParams>();
  @Output() onStopMoveEvent = new EventEmitter<ToDoTask>();

  @ViewChild('taskdiv', { static: true })
  taskDiv: ElementRef | undefined;

  isMoving = false;
  baseRect: DOMRect;
  isExpanded = false;

  constructor(private taskService: TaskService) {}

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
      this.onStopMoveEvent.emit(this.task);
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.isMoving) {
      const xOffset = event.x - this.baseRect.x;
      const yOffset = event.y - this.baseRect.y;

      this.taskDiv.nativeElement.style.transform = `rotateZ(-3deg) translate(${xOffset}px, ${yOffset}px)`;
      this.onMoveEvent.emit({ event, taskRect: this.baseRect, taskCategoryIndex: this.categoryIndex });
    }
  }

  setEditingTask() {
    this.taskService.editingTask = { ...this.task };
  }

  expandClick() {
    this.isExpanded = !this.isExpanded;
  }
}
