//this is pre generated from visual studios

import { Component, OnInit } from '@angular/core';
import { ProductOrder } from './model/product.order.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  shoppingCart: Array<ProductOrder> = [];

  ngOnInit(): void {
    if (JSON.parse(sessionStorage.getItem("currentShoppingCart")) == null) {
      sessionStorage.setItem("currentShoppingCart", JSON.stringify(this.shoppingCart));
    }
    }
  title = 'app';

  

}
