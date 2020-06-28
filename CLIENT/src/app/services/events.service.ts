import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient,private formBuilder : FormBuilder) { 
    this.createFormModel()
  }
  BaseURI = environment.apiUrl+"event";

  formModel : FormGroup

  fillFormModel(body){
    this.formModel.patchValue({
      _id: body._id,
      title: body.title,
      description: body.description,
      roles: body.roles,
      startDate : body.startDate,
      endDate : body.endDate,
      status : body.status,
      createdAt: body.createdAt,
    })
  }

  createFormModel() {
    this.formModel = this.formBuilder.group({
      _id: '',
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      roles: [],
      startDate : [new Date(), [Validators.required]],
      endDate : [new Date(), [Validators.required]],
      status : [false, [Validators.required]],
      createdAt: [new Date(), [Validators.required]],
    })
  }

  getAll(){
    return this.http.get(this.BaseURI+'/getAll')
  }
  
  getById(id : string){
    return this.http.get(this.BaseURI+'/'+id)
  }

  checkExists(id : string){
    return this.http.get(this.BaseURI+'/check/'+id)
  }

  createNew(body){
    delete this.formModel.value._id
    return this.http.post(this.BaseURI+'/create',body)
  }

  editById(id : string , body){
    return this.http.put(this.BaseURI+'/update/'+id,body)
  }

  deleteById(id){
    return this.http.delete(this.BaseURI+'/delete/'+id)
  }
}
