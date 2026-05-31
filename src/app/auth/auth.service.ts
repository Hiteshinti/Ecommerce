import { Injectable } from '@angular/core';
import { RegisterDto } from '../models/RegisterDto';
import { HttpClient } from '@angular/common/http';  
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationDto } from '../models/AuthenticationDto';



@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userKey = 'ecom_user';
  
  constructor(private $http: HttpClient) { }


  register(registerData:RegisterDto):Observable<AuthenticationDto> {

    return this.$http.post<AuthenticationDto>(environment.baseApiUrl+environment.RegisterUrl,registerData)
   
  }

  login(email:string,password:string): Observable<AuthenticationDto> {
    return this.$http
      .post<AuthenticationDto>(environment.baseApiUrl + environment.LoginUrl, { email, password })
      .pipe(
        tap((user) => {
          if (user?.success && user.token) {
            localStorage.setItem(this.userKey, JSON.stringify(user));
          }
        })
      );
  }

  logout(){ localStorage.removeItem(this.userKey); }

  current(){ return JSON.parse(localStorage.getItem(this.userKey)||'null'); }

  token(): string | null {
    return this.current()?.token || null;
  }
}
