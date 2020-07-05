import { Component, OnInit } from '@angular/core';
import { EventsService } from 'app/services/events.service';
import { NotificationsService } from 'app/services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.css']
})
export class EventsEditComponent {

  roles: any = ["RH","IT"]

  date: string;
  constructor(private eventService : EventsService,
    private notificationsService :NotificationsService,
    private router : Router) {
    if (!this.eventService.formModel.value._id) {
      this.router.navigateByUrl('events/list')
    }else{
      // console.log("formModel : ",this.eventService.formModel.value)

      this.eventService.formModel.patchValue({
        startDate : new Date(this.eventService.formModel.value.startDate).toISOString().slice(0, 16),
        endDate : new Date(this.eventService.formModel.value.endDate).toISOString().slice(0, 16),
      })
      console.log(this.eventService.formModel.value.startDate);  
    }
   }

  onSubmit(){
    console.log("this.formModel.value : ",this.eventService.formModel.value)
    this.eventService.editById(this.eventService.formModel.value._id,this.eventService.formModel.value)
    .subscribe(response=>{
      console.log("Edited successfully : ",response)
      this.notificationsService.showNotification('success','Successful Edition - event Successfully Edited.')
    },err=>{
      this.notificationsService.showNotification('danger','Something Wrong - Please Enter Valid Information.')

    })
  }

}
