import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from 'app/services/departments.service';
import { NotificationsService } from 'app/services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments-add',
  templateUrl: './departments-add.component.html',
  styleUrls: ['./departments-add.component.css']
})
export class DepartmentsAddComponent implements OnInit {

  constructor(private departmentService : DepartmentsService,private notificationsService :NotificationsService,private router : Router) {
    this.departmentService.createFormModel()
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("this.formModel.value : ",this.departmentService.formModel.value)
    this.departmentService.createNew(this.departmentService.formModel.value)
    .subscribe(response=>{
      console.log("Added successfully : ",response)
      this.notificationsService.showNotification('success','Successful Addition - Department Successfully Added.')
      this.departmentService.createFormModel()
    },err=>{
      this.notificationsService.showNotification('danger','Something Wrong - Please Enter Valid Information.')

    })
  }

}
