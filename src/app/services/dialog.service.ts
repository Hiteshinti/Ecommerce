import { Injectable, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private matDialog: MatDialog) {}

  openLoginDialog(): void {
    this.openDialog(LoginComponent);
  }

  openRegisterDialog(): void {
    this.openDialog(RegisterComponent);
  }

  openMessageDialog(message: string): void {
    this.closeDialog();
    this.matDialog.open(DialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      autoFocus: false,
      data: { message }
    });
  }

  private openDialog(component: Type<unknown>): void {
    this.closeDialog();
    this.matDialog.open(DialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      autoFocus: false,
      data: { component }
    });
  }

  closeDialog(): void {
    this.matDialog.closeAll();
  }
}
