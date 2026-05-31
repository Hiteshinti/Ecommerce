import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
 
  $cartIems = new BehaviorSubject<Product[]>([]); 
  constructor(){  }
  
}
