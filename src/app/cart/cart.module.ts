import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"; 
import { CartComponent } from "./cart.component";
import { CartRoutingModule } from "./cart-routing.module";
import { HttpClientModule } from "@angular/common/http";    
@NgModule({

    imports:[CommonModule,CartRoutingModule,  HttpClientModule], 
    declarations:[CartComponent],    
    exports:[CartComponent]  
})
export class CartModule  {}