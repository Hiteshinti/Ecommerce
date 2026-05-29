import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent{
  items = [] as any[];
  constructor(private cart: CartService){ this.items = this.cart.get(); }
  confirm(){
    // simulate order placement
    const order = { items: this.items, total: this.cart.total(), date: new Date() };
    localStorage.setItem('ecom_last_order', JSON.stringify(order));
    this.cart.clear();
    this.items = [];
    alert('Order placed (no payment). Thank you!');
  }
}
