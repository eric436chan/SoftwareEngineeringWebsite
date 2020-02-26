//this is pre generated from visual studios

import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shoppingCart-service';
import { ProductOrder } from '../model/product.order.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent{

  private shoppingCart: Array<ProductOrder> = []

  constructor(private shoppingCartService: ShoppingCartService) {
    this.shoppingCartService.getShoppingCart().subscribe(
      data => {
        this.shoppingCart = data;
        console.log(data);
      })
  }
}
