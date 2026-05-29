import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  constructor(private auth: AuthService, private router: Router) {}
  submit(loginForm: NgForm){
    this.error = '';
    if(loginForm.invalid){
      this.error = 'Please fix the errors before submitting.';
      return;
    }
    if(this.auth.login(this.email,this.password)){
      this.router.navigate(['/products']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
