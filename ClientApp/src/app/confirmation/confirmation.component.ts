import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order-service';
import { Order } from '../model/order.model';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.html',
  styleUrls: ['./confirmation.css']
})

export class ConfirmationComponent implements OnInit {

  currentOrder: Order;

  constructor(private orderService: OrderService) {

  }

  ngOnInit() {
    this.currentOrder = JSON.parse(sessionStorage.getItem("currentOrder"));
  }



}
