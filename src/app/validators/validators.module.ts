import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordMatchDirective } from './password-match.directive';
import { UsernameAvailableDirective } from './username-available.directive';

@NgModule({
  declarations: [PasswordMatchDirective, UsernameAvailableDirective],
  imports: [CommonModule],
  exports: [PasswordMatchDirective, UsernameAvailableDirective]
})
export class ValidatorsModule {}
