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

export class OrderComponent implements OnInit {

  shoppingCart: Array<ProductOrder>;
  testProductOrder: ProductOrder;
  orderList: Array<Order> = [];
  order: Order;
  orderReceived: boolean = false;
  orderChecked: boolean = false

  constructor(private orderService: OrderService, private shoppingCartService: ShoppingCartService) {
   
  }

  ngOnInit() {
    this.shoppingCartService.currentShoppingCart.subscribe(
      shoppingCart => {
        this.shoppingCart = shoppingCart;
        console.log(this.shoppingCart);
      })
  }

  onOrder(orderKey: HTMLInputElement) {
    this.order = null;
    this.orderService.getOrder().subscribe(
      data => {
        for (let order of data) {
          if (order.orderId == orderKey.value) {
            this.order = order;
            this.orderReceived = true;
            console.log("Order received.");
          }
        }
      });

    if (this.order == undefined) {
      this.orderChecked = true
    }
  }
}
