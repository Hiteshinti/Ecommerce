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
  login(data: any):Observable<AuthenticationDto>  {
    
    return this.$http.post<AuthenticationDto>(environment.baseApiUrl+environment.LoginUrl, data);
  }
  logout(){ 
    localStorage.removeItem('user_token'); 
  }
  current(){ return JSON.parse(localStorage.getItem('user_token')||'null'); }
}
