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

@NgModule({
  declarations: [
    TasksComponent,
    TaskComponent,
    TodoBlockComponent,
    TasksMenuComponent,
    TasksSearchComponent,
    TasksFilterPipe,
  ],
  imports: [CommonModule, MiscModule, FormsModule, ReactiveFormsModule],
})
export class TasksModule {}
