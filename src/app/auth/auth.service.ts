import { Injectable } from '@angular/core';
import { RegisterDto } from '../models/RegisterDto';
import { HttpClient } from '@angular/common/http';  
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { AuthenticationDto } from '../models/AuthenticationDto';



@Injectable({ providedIn: 'root' })
export class AuthService {
  
  constructor(private $http: HttpClient) { }


  register(registerData:RegisterDto):Observable<AuthenticationDto> {

    return this.$http.post<AuthenticationDto>(environment.baseApiUrl+environment.RegisterUrl,registerData)
   
  }
  login(email:string,password:string): boolean {
    return false;
  }
  logout(){ localStorage.removeItem('ecom_user'); }
  current(){ return JSON.parse(localStorage.getItem('ecom_user')||'null'); }
}
