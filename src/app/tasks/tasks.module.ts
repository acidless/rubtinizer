import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TodoBlockComponent } from './todo-block/todo-block.component';
import { TaskComponent } from './todo-block/task/task.component';
import { MiscModule } from '../misc/misc.module';
import { FormsModule } from '@angular/forms';
import { TasksMenuComponent } from './tasks-menu/tasks-menu.component';

@NgModule({
  declarations: [TasksComponent, TaskComponent, TodoBlockComponent, TasksMenuComponent],
  imports: [CommonModule, MiscModule, FormsModule],
})
export class TasksModule {}
