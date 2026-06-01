import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class CartService {
 
  $cartIems = new BehaviorSubject<Product[]>([]); 
  constructor(private $http:HttpClient){  }

  AddToCart(product: Product) {
    
    
  }
  
}
