import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  items: any[] = [];
  constructor(private cart: CartService){}
  ngOnInit(){ this.items = this.cart.get(); }
  remove(id:number){ this.cart.remove(id); this.items = this.cart.get(); }
  clear(){ this.cart.clear(); this.items = []; }
  subtotal(){ return this.cart.total(); }
}
