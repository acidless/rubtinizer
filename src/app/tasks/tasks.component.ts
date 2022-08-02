import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  @ViewChild('taskdelete', { static: true })
  taskDeleteBlock: ElementRef | undefined;

  constructor(private tasksService: TasksService) {}

  ngOnDestroy(): void {
    this.tasksService.saveTasks();
    this.tasksService.todoCategoriesBlocks = [];
  }

  ngOnInit(): void {
    this.tasksService.loadTasks();
    this.tasksService.setTaskDeleteBlock(this.taskDeleteBlock);
  }

  onInitTodoBlock(block: ElementRef) {
    this.tasksService.todoCategoriesBlocks.push(block);
  }
}
