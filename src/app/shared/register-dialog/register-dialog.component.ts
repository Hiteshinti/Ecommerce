import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  registerForm!: FormGroup;
  message = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(){
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submit(){
    this.error = '';
    this.message = '';
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
    const { name, email, password } = this.registerForm.value;
    const success = this.auth.register({ name, email, password });
    if(!success){
      this.error = 'Email is already registered.';
      return;
    }
    this.message = 'Registered — redirecting to login.';
    setTimeout(() => {
      this.closeDialog();
      this.router.navigate(['/login']);
    }, 1200);
  }

  closeDialog(){
    const dialog = document.querySelector('.register-dialog-overlay');
    if(dialog) dialog.remove();
  }
}
