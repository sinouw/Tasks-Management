import { Component, OnInit } from '@angular/core';
import { EventsService } from 'app/services/events.service';
import { NotificationsService } from 'app/services/notifications.service';
import { Router } from '@angular/router';
import { DepartmentsService } from 'app/services/departments.service';

@Component({
  selector: 'app-events-add',
  templateUrl: './events-add.component.html',
  styleUrls: ['./events-add.component.css']
})
export class EventsAddComponent implements OnInit {

  departmentsTitles : any = []
  roles: any = ["admin","RSC","RA","RS"]

  constructor(
    private eventService : EventsService,
    private notificationsService :NotificationsService,
    private router : Router,
    private departmentsService : DepartmentsService
  ) { 
    this.eventService.createFormModel()
    this.eventService.formModel.patchValue({
      startDate : new Date().toISOString().slice(0, 16),
      endDate : new Date().toISOString().slice(0, 16),
    })
    this.getDepartmentsTitles()
  }

  ngOnInit(): void {
  }

  getDepartmentsTitles() {
    this.departmentsService.getAll()
    .subscribe((response : any)=>{
     console.log("departments : ",response)
     this.departmentsTitles = response
    })
  }

  onSubmit(){
    console.log("this.formModel.value : ",this.eventService.formModel.value)
    this.eventService.createNew(this.eventService.formModel.value)
    .subscribe(response=>{
      console.log("Added successfully : ",response)
      this.notificationsService.showNotification('success','Successful Addition - Event Successfully Added.')
    },err=>{
      this.notificationsService.showNotification('danger','Something Wrong - Please Enter Valid Information.')

    })
  }


  

}
