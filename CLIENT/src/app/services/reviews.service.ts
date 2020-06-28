import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }
  BaseURI = environment.apiUrl+"review";

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
    return this.http.post(this.BaseURI+'/create',body)
  }

  editById(id : string , body){
    return this.http.put(this.BaseURI+'/update/'+id,body)
  }

  deleteById(id){
    return this.http.delete(this.BaseURI+'/delete/'+id)
  }
}
