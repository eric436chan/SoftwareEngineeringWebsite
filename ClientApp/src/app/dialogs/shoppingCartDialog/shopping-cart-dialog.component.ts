import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductOrder } from '../../model/product.order.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'shopping-cart-dialog',
  templateUrl: './shopping-cart-dialog.html',
  styleUrls: ['./shopping-cart-dialog.css']
})

export class ShoppingCartDialog {

  private shoppingCart;


  constructor(private snackBar: MatSnackBar, private shoppingCartDialog: MatDialogRef<ShoppingCartDialog>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Array<ProductOrder>) {

    this.shoppingCart = JSON.parse(sessionStorage.getItem("currentShoppingCart"));

  }

  onCheckout() {
    if (this.shoppingCart.length != 0) {
      console.log("moving over to checkout");
      this.shoppingCartDialog.close();
      this.router.navigate(['./checkout']);
    } else {
      this.snackBar.open("Your shopping cart is empty. Cannot move to checkout", null, { duration: 2000 })
    }
  }

  onRemove(index: number) {

    console.log("Item being removed from shopping cart...");
    this.shoppingCart.splice(index, 1);
    console.log("Item has been removed from shopping cart.");
    sessionStorage.setItem("currentShoppingCart", JSON.stringify(this.shoppingCart));

  }

}
