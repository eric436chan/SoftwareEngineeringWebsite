import { ProductOrder } from "../model/product.order.model";
import { Subject } from "rxjs/internal/Subject";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private shoppingCart = new Subject<Array<ProductOrder>>();


  getShoppingCart(): Observable<Array<ProductOrder>> {
    return this.shoppingCart.asObservable();
  }

  updateShoppingCart(shoppingCart: Array<ProductOrder>) {
    this.shoppingCart.next(shoppingCart);
  }

}
