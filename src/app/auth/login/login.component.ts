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
    
    this.auth.login(this.loginForm.value).subscribe({
      next: (data) => {
        if(data.token)
        {
          sessionStorage.setItem('user_token', data.token);
          this.auth.userSubject.next(data);
          this.router.navigate(['/products']);
        }
      }
    });
  }
}
