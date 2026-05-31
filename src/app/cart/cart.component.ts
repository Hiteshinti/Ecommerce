import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  
  productItems = [] as Product[];
  constructor(private cart: CartService){}
  ngOnInit(){

    this.cart.$cartIems.subscribe(items => {
          this.productItems = items;

    } );
  }
  subtotal(){  
    return this.productItems.reduce((acc, item) => acc + item.unitPrice * item.quantityStock, 0);  
  }

}
