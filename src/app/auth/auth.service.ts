import { Injectable } from '@angular/core';
import { RegisterDto } from '../models/RegisterDto';
import { HttpClient } from '@angular/common/http';  
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationDto } from '../models/AuthenticationDto';



@Injectable({ providedIn: 'root' })
export class AuthService {

  userSubject = new BehaviorSubject<AuthenticationDto | null>(null); 
  
  constructor(private $http: HttpClient) { }


  register(registerData:RegisterDto):Observable<AuthenticationDto> {

    return this.$http.post<AuthenticationDto>(environment.baseApiUrl+environment.RegisterUrl,registerData)
   
  }
  login(data: any):Observable<AuthenticationDto>  {
    
    return this.$http.post<AuthenticationDto>(environment.baseApiUrl+environment.LoginUrl, data);
  }
  logout(){ 
    sessionStorage.removeItem('user_token'); 
    this.userSubject.next(null);
  }
 
}
