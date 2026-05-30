import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product';
import { ResponseMessage } from '../models/ResponseMessage';



@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor (private $http:HttpClient) { }    
  getProducts():Observable<Product[]>
  {
    return this.$http
    .get<ResponseMessage<Product[]>>(environment.baseApiUrl + environment.GetProductsUrl)
    .pipe(
      map((response: ResponseMessage<Product[]>) => response.data)
    );

  }
}

