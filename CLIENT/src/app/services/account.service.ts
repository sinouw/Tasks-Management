import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient,private router : Router) {}
  BaseURI = environment.apiUrl;

  UploadImage(file : File,id : string) {
    return this.http.post(this.BaseURI + 'user/avatar/',file);
  }

  GetImageUrl() {
    return this.http.get(this.BaseURI + 'user/avatar/url/');
  }

  registerForUser(body : any) {
    return this.http.post(this.BaseURI + 'auth/register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + 'auth/login', formData)
  }
  
  getFullProfil() {
    return this.http.get(this.BaseURI + 'auth/getFullProfil')
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + 'auth/profil');
  }

  tokenExists(): boolean {
    let token = localStorage.getItem('token');
    return token ? true : false
  }

  getDecodedToken() {
    let token = localStorage.getItem('token');
    if (token) {
      return jwt_decode(token);
    }else{
      return null
    }
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }

}
