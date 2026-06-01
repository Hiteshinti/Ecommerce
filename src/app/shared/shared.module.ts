import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DialogComponent } from './dialog/dialog.component';
import { PasswordMatchDirective } from './password-match.directive';
import { UsernameAvailableDirective } from './username-available.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DialogComponent,
    PasswordMatchDirective,
    UsernameAvailableDirective,
  
  ],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MatDialogModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    DialogComponent,
    PasswordMatchDirective,
    UsernameAvailableDirective
  ]
})
export class SharedModule {}
