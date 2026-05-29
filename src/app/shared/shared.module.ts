import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DialogComponent } from './dialog/dialog.component';
import { PasswordMatchDirective } from '../validators/password-match.directive';
import { UsernameAvailableDirective } from '../validators/username-available.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DialogComponent,
    PasswordMatchDirective,
    UsernameAvailableDirective
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    DialogComponent,
    PasswordMatchDirective,
    UsernameAvailableDirective
  ]
})
export class SharedModule {}
