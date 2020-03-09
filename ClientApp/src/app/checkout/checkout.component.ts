import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shoppingCart-service';
import { ProductOrder } from '../model/product.order.model';
import { OrderService } from '../services/order-service';
import { MatSnackBar } from '@angular/material/snack-bar';

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



  constructor(private shoppingCartService: ShoppingCartService, private orderService: OrderService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.shoppingCartService.currentShoppingCart.subscribe(
      data => {
        this.shoppingCart = data;
      })
  }


  onClickNextUser() {
    if (this.firstName == undefined || this.lastName == undefined || this.email == undefined) {
      this.snackBar.open("Please fill out all forms!", null, {
        duration: 2000
      });
      return;
    }
    console.log("Form filled. Information received:\n" + this.firstName + "\n" + this.lastName + "\n" + this.email);
    this.selected++;
  }

  onClickNext() {
    this.selected++;
  }

  onClickBack() {
    this.selected--;
  }

 



 


}
