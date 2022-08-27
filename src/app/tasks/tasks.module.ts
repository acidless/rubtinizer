import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TodoBlockComponent } from './todo-block/todo-block.component';
import { TaskComponent } from './todo-block/task/task.component';
import { MiscModule } from '../misc/misc.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksMenuComponent } from './tasks-menu/tasks-menu.component';
import { TasksSearchComponent } from './tasks-search/tasks-search.component';
import { TasksFilterPipe } from '../pipes/tasks-filter.pipe';
import { ChangeTaskComponent } from './change-task/change-task.component';
import { AddTaskComponent } from './todo-block/add-task/add-task.component';
import { AddSubtaskComponent } from './todo-block/add-subtask/add-subtask.component';
import { SubtaskComponent } from './todo-block/task/subtask/subtask.component';
import {LabelsModule} from "../labels/labels.module";

@NgModule({
  declarations: [
    TasksComponent,
    TaskComponent,
    TodoBlockComponent,
    TasksMenuComponent,
    TasksSearchComponent,
    TasksFilterPipe,
    ChangeTaskComponent,
    AddTaskComponent,
    AddSubtaskComponent,
    SubtaskComponent,
  ],
  imports: [CommonModule, MiscModule, FormsModule, ReactiveFormsModule, LabelsModule],
})
export class TasksModule {}
