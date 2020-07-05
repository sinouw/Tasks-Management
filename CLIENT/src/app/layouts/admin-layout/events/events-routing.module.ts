import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsAddComponent } from './events-add/events-add.component';
import { EventsEditComponent } from './events-edit/events-edit.component';
import { EventsCalendarComponent } from './events-calendar/events-calendar.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'calendar', component: EventsCalendarComponent },
  { path: 'list', component: EventsListComponent },
  { path: 'add', component: EventsAddComponent },
  { path: 'edit', component: EventsEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
