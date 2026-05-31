import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  showProfileMenu = false;
  user: any = null;
  private userSub: Subscription;

  constructor(
    public auth: AuthService,
    public router: Router,
    private dialogService: DialogService
  ) {
    this.userSub = this.auth.userSubject.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

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
    
  }
}
