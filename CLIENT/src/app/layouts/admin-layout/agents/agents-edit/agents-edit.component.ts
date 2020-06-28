import { Component, OnInit } from '@angular/core';
import { UsersService } from 'app/services/users.service';
import { NotificationsService } from 'app/services/notifications.service';
import { ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agents-edit',
  templateUrl: './agents-edit.component.html',
  styleUrls: ['./agents-edit.component.css']
})
export class AgentsEditComponent {

  roles: any = ["admin","RH","IT"]

  constructor(private usersService: UsersService,
    private router: Router,
    private notificationsService: NotificationsService) {
    if (!this.usersService.formModel.value._id) {
      this.router.navigateByUrl('agents/list')
    } else {
      delete this.usersService.formModel.value.passwords
      console.log("formModel : ", this.usersService.formModel.value)
      
    }
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
    this.getFormValidationErrors()
    
    let body = {
      firstname: this.usersService.formModel.value.firstname,
      username: this.usersService.formModel.value.username,
      lastname: this.usersService.formModel.value.lastname,
      phone: this.usersService.formModel.value.phone,
      email: this.usersService.formModel.value.email,
      roles: this.usersService.formModel.value.roles,
    }

    this.usersService.editById(this.usersService.formModel.value._id,body).subscribe(
      (response: any) => {
        console.log("Edited Agent :", response)
        this.notificationsService.showNotification('success', 'Successful Edition - Agent Successfully Edited.')
      },
      err => {
        console.log("err : ", err)
        this.notificationsService.showNotification('danger', 'Something Wrong - Please Enter Valid Username and Password.')
      }
    );
  }

}
