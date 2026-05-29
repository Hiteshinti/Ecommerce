import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showProfileMenu = false;

  constructor(
    public auth: AuthService,
    public router: Router,
    private dialogService: DialogService
  ) {}

  get user() { return this.auth.current(); }

  isLoggedIn() { return !!this.user; }

  openLoginDialog(){
    this.dialogService.openLoginDialog();
  }

  openRegisterDialog(){
    this.dialogService.openRegisterDialog();
  }

  toggleProfileMenu(){
    this.showProfileMenu = !this.showProfileMenu;
  }

  closePopups(){
    this.showProfileMenu = false;
  }

  logout(){
    this.auth.logout();
    this.closePopups();
    this.router.navigate(['/login']);
  }
}
