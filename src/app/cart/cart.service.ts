import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private key = 'ecom_cart';
  constructor(){ if(!localStorage.getItem(this.key)) localStorage.setItem(this.key,'[]'); }
  get(){ return JSON.parse(localStorage.getItem(this.key) || '[]'); }
  add(item:any){
    const c = this.get();
    const itemId = item.id ?? item.productid;
    const existing = c.find((x:any)=>(x.id ?? x.productid)===itemId);
    if(existing) existing.qty++;
    else c.push({...item, qty:1});
    localStorage.setItem(this.key, JSON.stringify(c));
  }
  remove(id:number){ let c=this.get().filter((x:any)=>(x.id ?? x.productid)!==id); localStorage.setItem(this.key, JSON.stringify(c)); }
  clear(){ localStorage.setItem(this.key, '[]'); }
  total(){ return this.get().reduce((s:any,i:any)=>s + (i.price ?? i.unitprice)*i.qty,0); }
}
