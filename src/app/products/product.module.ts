import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule,HttpClientModule],
  exports: [ProductListComponent]
})
export class ProductModule {}
