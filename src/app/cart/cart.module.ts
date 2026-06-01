import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"; 
import { CartComponent } from "./cart.component";
import { CartRoutingModule } from "./cart-routing.module";
@NgModule({

    imports:[CommonModule,CartRoutingModule], 
    declarations:[CartComponent],    
    exports:[CartComponent]  
})
export class CartModule  {}