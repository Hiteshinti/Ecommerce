import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi: true }]
})
export class PasswordMatchDirective implements Validator {
  @Input() appPasswordMatch: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const matchingControl = control.parent?.get(this.appPasswordMatch);
    if (!matchingControl) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}

export function passwordMatchValidator(passwordField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const matchingControl = control.parent?.get(passwordField);
    if (!matchingControl) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      return { passwordMismatch: true };
    }

    return null;
  };
}
