import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shoppingCart-service';
import { ProductOrder } from '../model/product.order.model';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})

export class CheckoutComponent implements OnInit{

  private shoppingCart: Array<ProductOrder>
  private selected: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) {

  }

  ngOnInit() {
    this.shoppingCartService.currentShoppingCart.subscribe(
      data => {
        this.shoppingCart = data;
      })
  }


}
