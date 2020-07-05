import { NotificationsService } from './../../../../services/notifications.service';
import { AccountService } from './../../../../services/account.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formModel: FormGroup

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private notificationsService: NotificationsService,
    private router: Router) {
        let token = this.accountService.getDecodedToken();
        if (token) {
          let currentRoles = token.roles;
          let isAdmin = currentRoles.some(role => currentRoles.includes("admin"));
          if (isAdmin) this.router.navigateByUrl('/dashboard');
          else this.router.navigateByUrl('/events/calendar');
        }
    this.createFormModel()
  }

  createFormModel() {
    this.formModel = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  onSubmit() {
    this.accountService.login(this.formModel.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.access_token);
        let token = this.accountService.getDecodedToken();
        let currentRoles = token.roles;
        let isAdmin = currentRoles.some(role => currentRoles.includes("admin"));
        if (isAdmin) this.router.navigateByUrl('/dashboard');
        else this.router.navigateByUrl('/events/calendar');
      },
      err => {
        console.log("err : ",err)
        this.notificationsService.showNotification('danger','Something Wrong - Please Enter Valid Username and Password.')
      }
    );
  }
}
