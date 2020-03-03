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


  constructor(private snackBar: MatSnackBar, private shoppingCartDialog: MatDialogRef<ShoppingCartDialog>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Array<ProductOrder>) {
  }

  onCheckout() {
    if (this.data.length != 0) {
      console.log("moving over to checkout");
      this.shoppingCartDialog.close();
      this.router.navigate(['./checkout']);
    } else {
      this.snackBar.open("Your shopping cart is empty. Cannot move to checkout", null, { duration: 2000 })
    }
  }

}
