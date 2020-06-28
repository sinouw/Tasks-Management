import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  formModel: FormGroup
  constructor(private http: HttpClient,private formBuilder: FormBuilder) {
    this.createFormModel()
   }

  BaseURI = environment.apiUrl+"user";
  emailPattern: any = /\S+@\S+\.\S+/;


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
      roles: body.roles,
      status: body.status,
      createdAt: body.createdAt,
    })
    console.log("user Profil : ", this.formModel.value)
  }

  createFormModel() {
    this.formModel = this.formBuilder.group({
      _id: '',
      username: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
      address: '',
      city: '',
      country: '',
      postalCode:'' ,
      description: '',
      roles: [''],
      status: [true, [Validators.required]],
      createdAt: [new Date()],
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

  getAll(){
    return this.http.get(this.BaseURI+'/getAllDto')
  }
  
  getById(id : string){
    return this.http.get(this.BaseURI+'/'+id)
  }

  checkExists(id : string){
    return this.http.get(this.BaseURI+'/check/'+id)
  }

  createNew(body){
    return this.http.post(this.BaseURI+'/create',body)
  }

  editById(id : string , body){
    return this.http.put(this.BaseURI+'/update/'+id,body)
  }

  deleteById(id){
    return this.http.delete(this.BaseURI+'/delete/'+id)
  }
}
