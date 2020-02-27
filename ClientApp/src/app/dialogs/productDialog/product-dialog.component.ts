import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../model/product.model';


@Component({
  selector: 'product-dialog',
  templateUrl: './product-dialog.html',
  styleUrls: ['./product-dialog.css']
})

export class ProductDialog {

  constructor(private dialogRef: MatDialogRef<ProductDialog>,
    @Inject(MAT_DIALOG_DATA) private data: Product) {

  }

}
