import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TasksService } from './tasks.service';
import { TasksCategoriesService } from './tasks-categories.service';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  @ViewChild('taskdelete', { static: true })
  taskDeleteBlock: ElementRef | undefined;

  searchStr = '';

  constructor(
    public tasksService: TasksService,
    public tasksCategoriesService: TasksCategoriesService,
    public taskService: TaskService
  ) {}

  ngOnDestroy(): void {
    this.tasksService.saveTasks();
    this.tasksCategoriesService.todoCategoriesBlocks = [];
  }

  ngOnInit(): void {
    this.tasksService.loadTasks();
    this.taskService.setTaskDeleteBlock(this.taskDeleteBlock);
  }

  onInitTodoBlock(block: ElementRef) {
    this.tasksCategoriesService.todoCategoriesBlocks.push(block);
  }

  onSearchChange(value: string) {
    this.searchStr = value;
  }
}
