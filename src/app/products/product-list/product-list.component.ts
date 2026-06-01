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
      const cartItems = [...this.cart.$cartIems.value];
      const existingItem = cartItems.find(item => item.productId === p.productId);

      if (existingItem) {
        existingItem.quantityInStock += 1;
      } else {
        cartItems.push({ ...p, quantityInStock: 1 });
      }

      this.cart.$cartIems.next(cartItems); 

    } 
}
