import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './products/product.module';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [AppComponent, CartComponent, CheckoutComponent],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, AppRoutingModule, SharedModule, AuthModule, ProductModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
