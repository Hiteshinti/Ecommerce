import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get controls() {
    return this.loginForm.controls;
  }

  submit(): void {
    this.error = '';
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      this.error = 'Please fix the errors before submitting.';
      return;
    }

    const { email, password } = this.loginForm.value;
    if(this.auth.login(email, password)){
      this.router.navigate(['/products']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
