import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'app/services/account.service';
import { NotificationsService } from 'app/services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formModel: FormGroup
  emailPattern: any = /\S+@\S+\.\S+/;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private notificationsService: NotificationsService,
    private router: Router) {
    this.createFormModel()
  }


  createFormModel() {
    this.formModel = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      roles: ['NOROLE'],
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
