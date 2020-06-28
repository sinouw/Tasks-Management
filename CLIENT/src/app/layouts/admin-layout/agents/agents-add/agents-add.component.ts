import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'app/services/users.service';
import { NotificationsService } from 'app/services/notifications.service';
import { DepartmentsService } from 'app/services/departments.service';
import { ValidationErrors, NgForm } from '@angular/forms';

@Component({
  selector: 'app-agents-add',
  templateUrl: './agents-add.component.html',
  styleUrls: ['./agents-add.component.css']
})
export class AgentsAddComponent {

  @ViewChild('regForm', {static: false}) myForm: NgForm;
  
  departmentsTitles : any = []
  roles: any = ["admin","RSC","RA","RS"]

  constructor(private usersService : UsersService,
    private departmentsService : DepartmentsService,
    private notificationsService: NotificationsService) { 
      this.usersService.createFormModel()
      this.getDepartmentsTitles()
    }


  getDepartmentsTitles() {
    this.departmentsService.getAll()
    .subscribe((response : any)=>{
     console.log("departments : ",response)
     this.departmentsTitles = response
    })
  }

  getFormValidationErrors() {
    Object.keys(this.usersService.formModel.controls).forEach(key => {
  
    const controlErrors: ValidationErrors = this.usersService.formModel.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }

  onSubmit() {
    
    let body = {
      password : this.usersService.formModel.value.passwords.password,
      username : this.usersService.formModel.value.username,
      firstname:this.usersService.formModel.value.firstname,
      lastname:this.usersService.formModel.value.lastname,
      phone:this.usersService.formModel.value.phone,
      email:this.usersService.formModel.value.email,
      address:this.usersService.formModel.value.address,
      city:this.usersService.formModel.value.city,
      country:this.usersService.formModel.value.country,
      postalCode:this.usersService.formModel.value.postalCode,
      description:this.usersService.formModel.value.description,
      departmentId:this.usersService.formModel.value.departmentId,
      roles:this.usersService.formModel.value.roles,
    }
    debugger

    this.usersService.createNew(body).subscribe(
      (response: any) => {
        console.log("Added Agent :", response)
        this.notificationsService.showNotification('success', 'Successful Addition - Agent Successfully Added.')
        this.usersService.formModel.reset(), 
        this.myForm.resetForm();
      },
      err => {
        console.log("err : ", err)
        this.notificationsService.showNotification('danger', 'Something Wrong - Please Enter Valid Username and Password.')
      }
    );
  }
}
