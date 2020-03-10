import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shoppingCart-service';
import { ProductOrder } from '../model/product.order.model';
import { OrderService } from '../services/order-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from '../model/address.model';
import { CreditCardInfo } from '../model/creditCard.model';
import { Client } from '../model/client.model';
import { Order } from '../model/order.model';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})

export class CheckoutComponent implements OnInit {

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


  constructor(private shoppingCartService: ShoppingCartService, private orderService: OrderService,
    private snackBar: MatSnackBar, private router: Router) {

  }

  ngOnInit() {
    this.shoppingCartService.currentShoppingCart.subscribe(
      data => {
        this.shoppingCart = data;
      })
  }


  onClickNextUser() {

    if (this.firstName == undefined || this.lastName == undefined || this.email == undefined
      || this.creditCardNum == undefined || this.creditCardSecurity == undefined || this.creditCardExp == undefined) {
      this.snackBar.open("Please fill out all fields!", null, {
        duration: 2000
      });
      return;
    }
    console.log("User information form filled. Information received.");
    this.selected++;
  }

  onClickNextShipping() {

    if (this.street == undefined || this.city == undefined || this.state == undefined || this.zipCode == undefined) {
      this.snackBar.open("Please fill out all fields!", null, {
        duration: 2000
      });
      return;
    }

    console.log("Shipping information form filled. Information received.");
    this.selected++;
  }


  onClickNext() {
    this.selected++;
  }

  onClickBack() {
    this.selected--;
  }

  onClickConfirm() {
    let address: Address = {
      street: this.street,
      city: this.city,
      zipCode: this.zipCode,
      state: this.state
    }

    let creditCard: CreditCardInfo = {
      creditCardNumber: this.creditCardNum,
      creditCardSecurityCode: this.creditCardSecurity,
      creditCardExpiration: this.creditCardExp
    }

    let client: Client = {
      firstName: this.firstName,
      lastName: this.lastName,
      emailAddress: this.email,
      address: address,
      creditCardInfo: creditCard
    }

    let totalPrice: number = 0;
    for (let prod of this.shoppingCart) {
      totalPrice += prod.price;
    }

    let order: Order = {
      orderId: this.generateRandomId(),
      client: client,
      orderList: this.shoppingCart,
      datePlaced: null,
      totalPrice: totalPrice
    }

    this.orderService.addOrder(order);
    this.shoppingCartService.updateShoppingCart([]);
    this.orderService.updateOrder(order);
    this.router.navigate(['./confirmation']);
   
  }

  generateRandomId() {
    return '_' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

 



 


}
