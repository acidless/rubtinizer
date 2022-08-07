import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksCategoriesService {
  todoCategoriesBlocks: Array<ElementRef> = [];
  currentMovingTaskCategory = -1;
  currentMovingTaskBaseCategory = 0;

  constructor() {}

  setUndefinedMovingCategory() {
    this.currentMovingTaskCategory = -1;
  }

  setDeleteMovingCategory() {
    this.currentMovingTaskCategory = 4;
  }

  isDeleteMovingCategory() {
    return this.currentMovingTaskCategory === 4;
  }
}
