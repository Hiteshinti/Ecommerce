import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appUsernameAvailable]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UsernameAvailableDirective, multi: true }]
})
export class UsernameAvailableDirective implements Validator {
  constructor(private authService: AuthService) {}

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    return this.usernameAvailableValidator(this.authService)(control);
  }

  private usernameAvailableValidator(authService: AuthService): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      // Check if email already exists in registered users
      const users = JSON.parse(localStorage.getItem('ecom_users') || '[]');
      const emailExists = users.some((user: any) => user.email === control.value);

      if (emailExists) {
        return { usernameExists: true };
      }

      return null;
    };
  }
}

export function usernameAvailableValidator(authService: AuthService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const users = JSON.parse(localStorage.getItem('ecom_users') || '[]');
    const emailExists = users.some((user: any) => user.email === control.value);

    if (emailExists) {
      return { usernameExists: true };
    }

    return null;
  };
}
