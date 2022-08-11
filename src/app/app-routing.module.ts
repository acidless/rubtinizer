import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SettingsComponent } from './settings/settings.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TasksComponent,
  },
  {
    path: 'calendar',
    pathMatch: 'full',
    component: CalendarComponent,
  },
  {
    path: 'notes',
    pathMatch: 'full',
    component: NotesComponent,
  },
  {
    path: 'settings',
    pathMatch: 'full',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
