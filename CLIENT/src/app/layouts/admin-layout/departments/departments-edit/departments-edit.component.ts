import { NotificationsService } from './../../../../services/notifications.service';
import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from 'app/services/departments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments-edit',
  templateUrl: './departments-edit.component.html',
  styleUrls: ['./departments-edit.component.css']
})
export class DepartmentsEditComponent implements OnInit {  
  constructor(private departmentService : DepartmentsService,private notificationsService :NotificationsService,private router : Router) {
    if (!this.departmentService.formModel.value._id) {
      this.router.navigateByUrl('departments/list')
    }else{
      console.log("formModel : ",this.departmentService.formModel.value)
    }
   }
  ngOnInit(): void {
  }

  onSubmit(){
    console.log("this.formModel.value : ",this.departmentService.formModel.value)
    this.departmentService.editById(this.departmentService.formModel.value._id,this.departmentService.formModel.value)
    .subscribe(response=>{
      console.log("Edited successfully : ",response)
      this.notificationsService.showNotification('success','Successful Edition - Department Successfully Edited.')
    },err=>{
      this.notificationsService.showNotification('danger','Something Wrong - Please Enter Valid Information.')

    })
  }
}
