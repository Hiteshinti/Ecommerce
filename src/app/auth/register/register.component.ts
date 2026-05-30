import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });
  }

  get controls() {
    return this.registerForm.controls;
  }

  submit(){
   
   
  }
}
