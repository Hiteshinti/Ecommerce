import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private currentDialog: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  openLoginDialog(): void {
    this.closeDialog();
    this.createDialog('login');
  }

  openRegisterDialog(): void {
    this.closeDialog();
    this.createDialog('register');
  }

  private createDialog(type: 'login' | 'register'): void {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    overlay.onclick = (e) => {
      if(e.target === overlay) this.closeDialog();
    };

    const dialogBox = document.createElement('div');
    dialogBox.className = 'dialog-box';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'dialog-close';
    closeBtn.innerHTML = '✕';
    closeBtn.onclick = () => this.closeDialog();

    dialogBox.appendChild(closeBtn);

    if(type === 'login'){
      dialogBox.appendChild(this.createLoginForm());
    } else {
      dialogBox.appendChild(this.createRegisterForm());
    }

    overlay.appendChild(dialogBox);
    document.body.appendChild(overlay);
    this.currentDialog = overlay;
  }

  private createLoginForm(): HTMLElement {
    const container = document.createElement('div');
    container.innerHTML = `
      <h2 style="margin: 0 0 1.5rem; color: #0d6efd; font-weight: 700;">Login</h2>
      <form id="loginForm" novalidate style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Email</label>
          <input type="email" id="loginEmail" name="email" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem; font-size: 1rem;">
          <small class="error-msg" id="emailError" style="color: #dc3545; font-size: 0.85rem; margin-top: 0.25rem; display: block;"></small>
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Password</label>
          <input type="password" id="loginPassword" name="password" required minlength="4" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem; font-size: 1rem;">
          <small class="error-msg" id="passwordError" style="color: #dc3545; font-size: 0.85rem; margin-top: 0.25rem; display: block;"></small>
        </div>
        <div class="alert" id="loginError" style="display:none; background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 0.75rem; border-radius: 0.5rem;"></div>
        <button type="submit" class="btn-submit" style="width: 100%; padding: 0.75rem; background: #0d6efd; color: #fff; border: none; border-radius: 0.5rem; font-weight: 600; font-size: 1rem; cursor: pointer;">Login</button>
      </form>
      <div style="margin-top: 1.5rem; text-align: center; font-size: 0.95rem; color: #666;">
        <span>Don't have an account?</span>
        <a href="#" onclick="event.preventDefault();" class="register-link" style="color: #0d6efd; text-decoration: none; font-weight: 600; margin-left: 0.25rem;">Register here</a>
      </div>
    `;

    const form = container.querySelector('#loginForm') as HTMLFormElement;
    const registerLink = container.querySelector('.register-link') as HTMLAnchorElement;
    const emailInput = container.querySelector('#loginEmail') as HTMLInputElement;
    const passwordInput = container.querySelector('#loginPassword') as HTMLInputElement;
    const errorDiv = container.querySelector('#loginError') as HTMLElement;

    registerLink.onclick = (e) => {
      e.preventDefault();
      this.openRegisterDialog();
    };

    form.onsubmit = (e) => {
      e.preventDefault();
      errorDiv.style.display = 'none';
      errorDiv.textContent = '';

      if(!emailInput.value || !passwordInput.value){
        errorDiv.textContent = 'Please fill in all fields';
        errorDiv.style.display = 'block';
        return;
      }

      if(this.auth.login(emailInput.value, passwordInput.value)){
        this.closeDialog();
        this.router.navigate(['/products']);
      } else {
        errorDiv.textContent = 'Invalid credentials';
        errorDiv.style.display = 'block';
      }
    };

    return container;
  }

  private createRegisterForm(): HTMLElement {
    const container = document.createElement('div');
    container.innerHTML = `
      <h2 style="margin: 0 0 1.5rem; color: #0d6efd; font-weight: 700;">Register</h2>
      <form id="registerForm" novalidate style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Name (Min 2 characters)</label>
          <input type="text" id="registerName" name="name" required minlength="2" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem; font-size: 1rem;">
          <small class="error-msg" id="nameError" style="color: #dc3545; font-size: 0.85rem; margin-top: 0.25rem; display: block;"></small>
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Email (Must be unique)</label>
          <input type="email" id="registerEmail" name="email" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem; font-size: 1rem;">
          <small class="error-msg" id="registerEmailError" style="color: #dc3545; font-size: 0.85rem; margin-top: 0.25rem; display: block;"></small>
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Password (Min 4 characters)</label>
          <input type="password" id="registerPassword" name="password" required minlength="4" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem; font-size: 1rem;">
          <small class="error-msg" id="registerPasswordError" style="color: #dc3545; font-size: 0.85rem; margin-top: 0.25rem; display: block;"></small>
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Confirm Password</label>
          <input type="password" id="registerConfirmPassword" name="confirmPassword" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem; font-size: 1rem;">
          <small class="error-msg" id="confirmPasswordError" style="color: #dc3545; font-size: 0.85rem; margin-top: 0.25rem; display: block;"></small>
        </div>
        <div class="alert" id="registerError" style="display:none; background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 0.75rem; border-radius: 0.5rem;"></div>
        <div class="success-msg" id="registerSuccess" style="display:none; background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 0.75rem; border-radius: 0.5rem;"></div>
        <button type="submit" class="btn-submit" style="width: 100%; padding: 0.75rem; background: #0d6efd; color: #fff; border: none; border-radius: 0.5rem; font-weight: 600; font-size: 1rem; cursor: pointer;">Register</button>
      </form>
      <div style="margin-top: 1.5rem; text-align: center; font-size: 0.95rem; color: #666;">
        <span>Already have an account?</span>
        <a href="#" onclick="event.preventDefault();" class="login-link" style="color: #0d6efd; text-decoration: none; font-weight: 600; margin-left: 0.25rem;">Login here</a>
      </div>
    `;

    const form = container.querySelector('#registerForm') as HTMLFormElement;
    const loginLink = container.querySelector('.login-link') as HTMLAnchorElement;
    const nameInput = container.querySelector('#registerName') as HTMLInputElement;
    const emailInput = container.querySelector('#registerEmail') as HTMLInputElement;
    const passwordInput = container.querySelector('#registerPassword') as HTMLInputElement;
    const confirmPasswordInput = container.querySelector('#registerConfirmPassword') as HTMLInputElement;
    const nameError = container.querySelector('#nameError') as HTMLElement;
    const registerEmailError = container.querySelector('#registerEmailError') as HTMLElement;
    const registerPasswordError = container.querySelector('#registerPasswordError') as HTMLElement;
    const confirmPasswordError = container.querySelector('#confirmPasswordError') as HTMLElement;
    const errorDiv = container.querySelector('#registerError') as HTMLElement;
    const successDiv = container.querySelector('#registerSuccess') as HTMLElement;

    loginLink.onclick = (e) => {
      e.preventDefault();
      this.openLoginDialog();
    };

    // Email blur validation - check if username already exists
    emailInput.onblur = () => {
      registerEmailError.textContent = '';
      if (emailInput.value) {
        const users = JSON.parse(localStorage.getItem('ecom_users') || '[]');
        const emailExists = users.some((user: any) => user.email === emailInput.value);
        if (emailExists) {
          registerEmailError.textContent = 'Email already exists. Please use a different email.';
        }
      }
    };

    // Password field blur validation - check if confirm password matches
    passwordInput.onblur = () => {
      registerPasswordError.textContent = '';
      if (passwordInput.value && passwordInput.value.length < 4) {
        registerPasswordError.textContent = 'Password must be at least 4 characters long.';
      }
    };

    // Confirm password field blur validation
    confirmPasswordInput.onblur = () => {
      confirmPasswordError.textContent = '';
      if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match.';
      }
    };

    form.onsubmit = (e) => {
      e.preventDefault();
      errorDiv.style.display = 'none';
      successDiv.style.display = 'none';
      nameError.textContent = '';
      registerEmailError.textContent = '';
      registerPasswordError.textContent = '';
      confirmPasswordError.textContent = '';
      errorDiv.textContent = '';
      successDiv.textContent = '';

      // Validation checks
      if (!nameInput.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value) {
        errorDiv.textContent = 'Please fill in all fields';
        errorDiv.style.display = 'block';
        return;
      }

      if (nameInput.value.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters long.';
        return;
      }

      if (passwordInput.value.length < 4) {
        registerPasswordError.textContent = 'Password must be at least 4 characters long.';
        return;
      }

      if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        return;
      }

      // Check if email already exists (username check)
      const users = JSON.parse(localStorage.getItem('ecom_users') || '[]');
      const emailExists = users.some((user: any) => user.email === emailInput.value);
      if (emailExists) {
        registerEmailError.textContent = 'Email already exists. Please use a different email.';
        return;
      }

      const success = this.auth.register({
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
      });

      if (!success) {
        errorDiv.textContent = 'Registration failed. Please try again.';
        errorDiv.style.display = 'block';
        return;
      }

      successDiv.textContent = 'Registered successfully! Redirecting to login...';
      successDiv.style.display = 'block';
      setTimeout(() => {
        this.closeDialog();
        this.router.navigate(['/login']);
      }, 1500);
    };

    return container;
  }

  closeDialog(): void {
    if(this.currentDialog){
      this.currentDialog.remove();
      this.currentDialog = null;
    }
  }
}
