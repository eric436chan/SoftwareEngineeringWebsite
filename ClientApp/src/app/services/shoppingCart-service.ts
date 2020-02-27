import { ProductOrder } from "../model/product.order.model";
import { Subject } from "rxjs/internal/Subject";
import { Observable, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  private shoppingCart: BehaviorSubject<Array<ProductOrder>> = new BehaviorSubject([]);
  currentShoppingCart = this.shoppingCart.asObservable();

  updateShoppingCart(shoppingCart: Array<ProductOrder>) {
    this.shoppingCart.next(shoppingCart);
  }

}
