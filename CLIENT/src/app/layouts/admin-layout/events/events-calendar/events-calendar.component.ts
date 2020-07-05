import {
  Component,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventsService } from 'app/services/events.service';
import { AccountService } from 'app/services/account.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'app/services/notifications.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  }
};

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.css']
})
export class EventsCalendarComponent {

  clickedDate: Date;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  constructor(private eventSerivce: EventsService,
    private accountService: AccountService,
    private notificationsService: NotificationsService,
    private router: Router) {
    let token = this.accountService.getDecodedToken();
    let currentRoles = token.roles;
    let currentUserId = token.sub;
    let isAdmin = currentRoles.some(role => currentRoles.includes("admin"));
    if (isAdmin) {
      this.getAllForAdmin("")
    }
    else {
        this.getAllForAdmin(currentRoles)
    }
  }
  events: CalendarEvent[] = [];

  getAllForAdmin(currentRoles) {
    if (currentRoles == "") {
      this.eventSerivce.getAll()
        .subscribe((response: any) => {
          console.log("events : ", response)
          if (response.length > 0) {
            response.map(e => {
              this.addEvents(e.title, new Date(e.startDate), new Date(e.endDate))
            })
          }
        })
      } else {
        this.eventSerivce.getAll()
      .subscribe((response: any) => {
        console.log("events : ", response)
        if (response.length > 0) {
          response.map(e => {

            
            
            if (currentRoles.some(x=>e.roles.includes(x))) {


              this.addEvents(e.title, new Date(e.startDate), new Date(e.endDate))
            }
          })
        }
      })

    }
  }

  addEvents(title, startRes, endRes): void {

    this.events = [
      ...this.events,
      {
        title: title,
        start: startRes,
        end: endRes,
        color: colors.red,
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date }: { date: Date }): void {
    this.clickedDate = date
    if (this.view === CalendarView.Month) {
      this.viewDate = date;
      this.view = CalendarView.Week;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
  }

}
