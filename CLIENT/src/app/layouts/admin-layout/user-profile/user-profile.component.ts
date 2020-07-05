import { AccountService } from 'app/services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'app/services/users.service';
import { NotificationsService } from 'app/services/notifications.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  formModel: FormGroup

  constructor(private accountService: AccountService,
    private notificationsService: NotificationsService,
    private usersService: UsersService,
    private formBuilder: FormBuilder) {
    this.createFormModel()
    this.getFullProfil()
  }

  fillFormModel(body) {
    this.formModel.patchValue({
      _id: body._id,
      username: body.username,
      firstname: body.firstname,
      lastname: body.lastname,
      phone: body.phone,
      email: body.email,
      address: body.address,
      city: body.city,
      country: body.country,
      postalCode: body.postalCode,
      description: body.description,
      avatarUrl: "http://localhost:3000/avatars/" + body.avatarUrl,
      roles: body.roles,
      status: body.status,
      createdAt: body.createdAt,
    })
    console.log("user Profil : ", this.formModel.value)
  }

  createFormModel() {
    this.formModel = this.formBuilder.group({
      _id: '',
      username: [''],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: '',
      email: ['', [Validators.required]],
      address: '',
      city: '',
      country: '',
      postalCode: '',
      description: '',
      avatarUrl: [''],
      roles: [''],
      status: '',
      createdAt: [new Date()],
    })
  }

  onSubmit() {
    let body = {
      firstname:this.formModel.value.firstname,
      lastname:this.formModel.value.lastname,
      phone:this.formModel.value.phone,
      email:this.formModel.value.email,
      address:this.formModel.value.address,
      city:this.formModel.value.city,
      country:this.formModel.value.country,
      postalCode:this.formModel.value.postalCode,
      description:this.formModel.value.description,
    }

    debugger
    this.usersService.editById(this.formModel.value._id, body).subscribe(
      (response: any) => {
        console.log("Edit Profil :", response)
        // this.fillFormModel(response.user)
        this.notificationsService.showNotification('success', 'Successful Edition - Profil Successfully Edited.')
      },
      err => {
        console.log("err : ", err)
        this.notificationsService.showNotification('danger', 'Something Wrong - Please Enter Valid Username and Password.')
      }
    );
  }

  getFullProfil() {
    console.log("ok")
    this.accountService.getFullProfil()
      .subscribe(response => {
        if (response) {
          this.fillFormModel(response)
        }
      })
  }

  UploadImage(files) {
    var file: File = files[0];
    console.log(file)
    const formData: any = new FormData();
    formData.append('file', file);
    this.accountService.UploadImage(formData, this.formModel.value._id)
      .subscribe(res => {
        console.log(res);
        this.formModel.patchValue({avatarUrl : res})
      },
        err => {
          console.error(err);
        })

  }

}
