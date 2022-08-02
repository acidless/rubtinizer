import { ElementRef, Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { ToDoTask } from '../../types/task';
import data from '../../../data.json';
import { IsPointInRect } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  currentDate = new Date();
  tasks: Array<Array<ToDoTask>> = [[], [], []];
  todoCategoriesBlocks: Array<ElementRef> = [];
  currentMoveTaskCategory = -1;
  currentMoveTaskBaseCategory = 0;
  isTaskMoving = false;
  taskDeleteBlock: ElementRef | undefined;

  constructor(private electronService: ElectronService) {}

  setTaskDeleteBlock(taskDeleteBlock) {
    this.taskDeleteBlock = taskDeleteBlock;
  }

  loadTasks() {
    this.currentDate = new Date(localStorage.getItem('date'));
    const currentDayTaks = data[this.currentDate.toDateString()];

    if (currentDayTaks) {
      this.tasks = [...currentDayTaks];
    } else {
      data[this.currentDate.toDateString()] = [[], [], []];
    }
  }

  saveTasks(date = this.currentDate) {
    if (!this.isTasksEmpty(this.tasks) || !this.isTasksEmpty(data[date.toDateString()])) {
      data[date.toDateString()] = this.tasks;
      this.electronService.ipcRenderer.send('tasks', ['save', JSON.stringify(data)]);
    }

    localStorage.setItem('date', this.currentDate.toDateString());
  }

  addTask({ task, index }) {
    this.tasks[index].push(task);
  }

  removeTask(task: ToDoTask) {
    this.tasks[this.currentMoveTaskBaseCategory] = this.tasks[this.currentMoveTaskBaseCategory].filter(
      (_task) => _task.timestamp !== task.timestamp
    );

    this.currentMoveTaskCategory = -1;
  }

  taskMoving({ event, taskRect, categoryIndex }) {
    this.isTaskMoving = true;
    this.currentMoveTaskBaseCategory = +categoryIndex;

    const isInSomeRect = this.todoCategoriesBlocks.some((todoBlock, index) => {
      if (this.currentMoveTaskBaseCategory !== index) {
        const rect = todoBlock.nativeElement.getBoundingClientRect();
        const moveBlock = todoBlock.nativeElement.getElementsByClassName('todo-block__move')[0];

        if (
          IsPointInRect(event, {
            top: rect.top,
            left: rect.left,
            bottom: rect.bottom + taskRect.height,
            right: rect.right,
          })
        ) {
          moveBlock.style.height = `${taskRect.height}px`;
          moveBlock.classList.add('active');
          this.currentMoveTaskCategory = index;
          return true;
        } else {
          moveBlock.classList.remove('active');
          moveBlock.style.height = 0;
          return false;
        }
      }
    });

    if (!isInSomeRect) {
      this.currentMoveTaskCategory = -1;
    }

    if (IsPointInRect(event, this.taskDeleteBlock.nativeElement.getBoundingClientRect())) {
      this.currentMoveTaskCategory = 4;
    }
  }

  taskStopMoving(task: ToDoTask) {
    if (this.isTaskMoving) {
      this.isTaskMoving = false;

      if (this.currentMoveTaskCategory === 4) {
        this.removeTask(task);
      }

      this.todoCategoriesBlocks.forEach((todoBlock, index) => {
        if (this.currentMoveTaskCategory === index) {
          this.tasks[index].push(task);
          this.removeTask(task);
        }

        const moveBlock = todoBlock.nativeElement.getElementsByClassName('todo-block__move')[0];
        moveBlock.classList.remove('active');
        moveBlock.style.height = 0;
      });
    }
  }

  copyTasksToNextDay() {
    const newDate = this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.saveTasks(new Date(newDate));
  }

  isTasksEmpty(tasks: Array<Array<ToDoTask>>) {
    return tasks.every((arr) => arr.length === 0);
  }
}
