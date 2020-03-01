//this is pre generated from visual studios

import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shoppingCart-service';
import { ProductOrder } from '../model/product.order.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  shoppingCart: Array<ProductOrder>;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.shoppingCartService.currentShoppingCart.subscribe(
      shoppingCart => {
        this.shoppingCart = shoppingCart;
        console.log(this.shoppingCart);
      })
  }
}
