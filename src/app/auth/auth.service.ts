import { Injectable } from '@angular/core';

interface User { name:string; email:string; password:string }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private key = 'ecom_users';
  constructor(){ if(!localStorage.getItem(this.key)) localStorage.setItem(this.key, JSON.stringify([])); }
  register(user: User){
    const list = JSON.parse(localStorage.getItem(this.key) || '[]');
    if(list.some((u: User) => u.email === user.email)){
      return false;
    }
    list.push(user);
    localStorage.setItem(this.key, JSON.stringify(list));
    return true;
  }
  login(email:string,password:string){
    const list: User[] = JSON.parse(localStorage.getItem(this.key) || '[]');
    const found = list.find(u=>u.email===email && u.password===password);
    if(found){
      localStorage.setItem('ecom_user', JSON.stringify(found));
      return true;
    }
    return false;
  }
  logout(){ localStorage.removeItem('ecom_user'); }
  current(){ return JSON.parse(localStorage.getItem('ecom_user')||'null'); }
}
