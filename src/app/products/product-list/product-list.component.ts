import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products = [] as Product[];
  cartItems: Product[]=[];
  constructor(private ps: ProductService, private cart: CartService){

  }
  ngOnInit(){ 

     this.ps.getProducts().subscribe({
         next: (data:Product[]) => {
          this.products = data;
          console.log(this.products);
        },
         error: (err) => console.error('Error fetching products:', err)
     });

     
  }

 
  add(p:Product){ 
       
      this.cartItems.push(p);  
      this.cart.$cartIems.next(this.cartItems); 

    } 
}
