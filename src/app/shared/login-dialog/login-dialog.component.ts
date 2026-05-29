import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
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
    if(this.auth.login(this.email, this.password)){
      this.router.navigate(['/products']);
      this.closeDialog();
    } else {
      this.error = 'Invalid credentials';
    }
  }

  closeDialog(){
    const dialog = document.querySelector('.login-dialog-overlay');
    if(dialog) dialog.remove();
  }
}
