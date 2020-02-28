import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ShoppingCartService } from '../../services/shoppingCart-service';
import { ProductOrder } from '../../model/product.order.model';
import { Product } from '../../model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialog } from '../../dialogs/productDialog/product-dialog.component';

@Component({
  selector: 'women-prod',
  templateUrl: './women-products.html',
  styleUrls: ['./women-products.css']
})

export class WomenProductsComponent implements OnInit{

  shoppingCart: Array<ProductOrder>;
  fullProductList: Array<Product>;
  actualProductList: Array<Product>;
  currentFilteringOption: string;

  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.shoppingCartService.currentShoppingCart.subscribe(
      shoppingCart => {
        this.shoppingCart = shoppingCart;
        console.log(this.shoppingCart);
      });

    this.productService.getAllProducts().subscribe(
      data => {
        this.fullProductList = data;
        this.actualProductList = data;
      });
  }

  changeProductList(filter: string) {

    if (filter == "yes") {
      let tempProductList: Array<Product> = [];

      for (let product of this.fullProductList) {
        if (product.name == "test") {
          tempProductList.push(product);
        }
      }

      this.actualProductList = tempProductList;

    } else if (filter == "no") {

      let tempProductList: Array<Product> = [];

      for (let product of this.fullProductList) {
        if (product.name == "test2") {
          tempProductList.push(product);
        }
      }

      this.actualProductList = tempProductList;

    }
  }

  onClickProduct(index: number) {
    const productDialog = this.dialog.open(ProductDialog, {
      data: this.actualProductList[index]
    });
  }


}
