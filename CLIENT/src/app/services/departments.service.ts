import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  
  constructor(private http: HttpClient, private formBuilder : FormBuilder) { 
    this.createFormModel()
  }

  formModel : FormGroup

  subject  = new Subject<any>();

  fillFormModel(body){
    this.formModel.patchValue({
      _id: body._id,
      title: body.title,
      description: body.description,
      status : body.status,
      createdAt: body.createdAt,
    })
  }

   createFormModel() {
    this.formModel = this.formBuilder.group({
      _id: '',
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status : [false, [Validators.required]],
      createdAt: [new Date(), [Validators.required]],
    })
  }

  sendSubcription(body: any) {
    this.subject.next(body) 
  }
  
  getSubscription() : Observable<any> {
    return this.subject.asObservable() 
  }

  BaseURI = environment.apiUrl+"department";

  getAll(){
    return this.http.get(this.BaseURI+'/getAll')
  }
  
  getEnabled(){
    return this.http.get(this.BaseURI+'/getEnabled')
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
