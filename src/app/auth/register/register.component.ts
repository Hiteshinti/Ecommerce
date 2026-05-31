import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DialogService } from '../../services/dialog.service';

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
    private fb: FormBuilder,
    private dialogService: DialogService
  ) {}

  ngOnInit(){
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
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
    this.message = '';
    this.error = '';

    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      this.error = 'Please fix the errors before submitting.';
      return;
    }

    this.auth.register(this.registerForm.value).subscribe({
      next: (data) => {
        if(data.success){
          this.dialogService.openLoginDialog();
        } else {
          this.dialogService.openMessageDialog('Registration failed. Please try again.');
        }
      },
      error: () => {
        this.dialogService.openMessageDialog('Registration failed. Please try again.');
      }
    });
  }
}
