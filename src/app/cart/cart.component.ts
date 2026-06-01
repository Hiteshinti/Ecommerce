import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { Product } from '../models/Product';
import { AuthService } from '../auth/auth.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  
  productItems = [] as Product[];
  constructor(
    private cart: CartService,
    private auth: AuthService,
    private dialogService: DialogService,
    private router: Router
  ){}
  ngOnInit(){

    this.cart.$cartIems.subscribe(items => {
          this.productItems = items;

    } );
  }
  subtotal(){  
    return this.productItems.reduce((acc, item) => acc + item.unitPrice * item.quantityInStock, 0);  
  }

  proceedToCheckout(): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/checkout']);
      return;
    }

    this.dialogService.openLoginDialog();
  }

  private isLoggedIn(): boolean {
    return !!this.auth.userSubject.value || !!sessionStorage.getItem('user_token');
  }

}
