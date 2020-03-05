import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shoppingCart-service';
import { ProductOrder } from '../model/product.order.model';
import { OrderService } from '../services/order-service';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})

export class CheckoutComponent implements OnInit{

  private shoppingCart: Array<ProductOrder>
  private selected: number = 0;
  private firstName: string;
  private lastName: string;
  private email: string;
  private street: string;
  private zipCode: string;
  private city: string;
  private state: string;
  private creditCardNum: number;
  private creditCardSecurity: number;
  private creditCardExp: string;

 

  constructor(private shoppingCartService: ShoppingCartService, private orderService: OrderService) {

  }

  ngOnInit() {
    this.shoppingCartService.currentShoppingCart.subscribe(
      data => {
        this.shoppingCart = data;
      })
  }

  onClickNext() {
    this.selected++;
  }

  onClickBack() {
    this.selected--;
  }

 



 


}
