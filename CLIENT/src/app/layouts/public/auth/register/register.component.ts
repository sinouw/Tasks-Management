import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'app/services/account.service';
import { NotificationsService } from 'app/services/notifications.service';
import { Router } from '@angular/router';
import { DepartmentsService } from 'app/services/departments.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formModel: FormGroup
  departmentsTitles : any = []
  emailPattern: any = /\S+@\S+\.\S+/;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private departmentSerivce: DepartmentsService,
    private notificationsService: NotificationsService,
    private router: Router) {
    this.getDepartmentsTitles()
    this.createFormModel()
  }

  getDepartmentsTitles() {
    this.departmentSerivce.getAll()
    .subscribe((response : any)=>{
     console.log("departments : ",response)
     this.departmentsTitles = response
    })
  }

  createFormModel() {
    this.formModel = this.formBuilder.group({
      departmentId: ['', Validators.required],
      username: ['', Validators.required],
      email: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      roles: ['user'],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.comparePasswords })
    })
  }
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('confirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('password').value != confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      }
      else {
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }

  onSubmit() {

    this.formModel.value.password = this.formModel.value.passwords.password 
    this.accountService.registerForUser(this.formModel.value).subscribe(
      (res: any) => {
        console.log(res)
        this.router.navigateByUrl('/login');
        this.notificationsService.showNotification('success','Successful Account Creation - Your Account Was Successfully Created.')
      },
      err => {
        console.log("err : ",err)
        this.notificationsService.showNotification('danger','Something Wrong - Please Enter Valid Username and Password.')
      }
    );
  }
}
