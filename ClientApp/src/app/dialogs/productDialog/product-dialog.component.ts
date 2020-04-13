import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../model/product.model';
import { ProductOrder } from '../../model/product.order.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'product-dialog',
  templateUrl: './product-dialog.html',
  styleUrls: ['./product-dialog.css']
})

export class ProductDialog implements OnInit {

  shoppingCart: Array<ProductOrder>;
  selectedColor: string;
  selectedSize: string;

  constructor(private dialogRef: MatDialogRef<ProductDialog>, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: Product) {
  }

  ngOnInit() {
    this.shoppingCart = JSON.parse(sessionStorage.getItem("currentShoppingCart"));
  }

  onAddToCart() {

    if (this.selectedColor == undefined || this.selectedSize == undefined) {
      return;
    }

    let prod: ProductOrder = {
      name: this.data.name,
      description: this.data.description,
      img: this.data.img,
      color: this.selectedColor,
      size: this.selectedSize,
      price: this.data.price,
      gender: this.data.gender,
      tag: this.data.tag
    }

    this.shoppingCart.push(prod);
    //this.shoppingCartService.updateShoppingCart(this.shoppingCart);
    sessionStorage.setItem("currentShoppingCart", JSON.stringify(this.shoppingCart));

    this.dialogRef.close();
    this.snackBar.open("Item has been added to shopping cart!", null, {
      duration: 2000
    });


  }

}
