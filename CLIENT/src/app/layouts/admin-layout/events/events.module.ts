import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';

import { EventsListComponent } from './events-list/events-list.component';
import { EventsAddComponent } from './events-add/events-add.component';
import { EventsEditComponent } from './events-edit/events-edit.component';
import { MaterialModule } from 'app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsCalendarComponent } from './events-calendar/events-calendar.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import 'hammerjs';
// import 'core-js/es7/array';

@NgModule({
  declarations: [EventsListComponent,EventsAddComponent,EventsEditComponent, EventsCalendarComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class EventsModule { }
