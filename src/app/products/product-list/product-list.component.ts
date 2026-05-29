import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  constructor(private ps: ProductService, private cart: CartService){

  }
  ngOnInit(){ 
    this.ps.getProducts().subscribe(products => this.products = products);
  }
 
    add(p: Product){ 
        this.cart.add(p);
     } 
}
