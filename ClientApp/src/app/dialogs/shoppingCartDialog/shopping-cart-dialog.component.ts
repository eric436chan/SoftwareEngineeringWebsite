import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductOrder } from '../../model/product.order.model';

@Component({
  selector: 'shopping-cart-dialog',
  templateUrl: './shopping-cart-dialog.html',
  styleUrls: ['./shopping-cart-dialog.css']
})

export class ShoppingCartDialog {


  constructor(private shoppingCartDialog: MatDialogRef<ShoppingCartDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Array<ProductOrder>) {
  }

  onCheckout() {

  }

}
