import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shoppingCart-service';
import { ProductOrder } from '../model/product.order.model';
import { OrderService } from '../services/order-service';
import { Order } from '../model/order.model';

@Component({
  selector: 'order',
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})

export class OrderComponent {

  shoppingCart: Array<ProductOrder> = [];
  order: Order;
  orderChecked: boolean = false


  constructor(private orderService: OrderService) {
   
  }

  onOrder(orderKey: HTMLInputElement) {
    this.orderChecked = true;
    console.log(orderKey.value);
  }

  
}
