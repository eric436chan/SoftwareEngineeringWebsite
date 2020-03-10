import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ShoppingCartService } from '../../services/shoppingCart-service';
import { ProductOrder } from '../../model/product.order.model';
import { Product } from '../../model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialog } from '../../dialogs/productDialog/product-dialog.component';
import { BrowsingService } from '../../services/browsing-service';

@Component({
  selector: 'women-prod',
  templateUrl: './women-products.html',
  styleUrls: ['./women-products.css']
})

export class WomenProductsComponent implements OnInit{

  shoppingCart: Array<ProductOrder>;
  fullProductList: Array<Product>;
  actualProductList: Array<Product>;

  colorArray: Array<string> = [];
  sizeArray: Array<string> = [];

  waistArray: Array<string> = [];
  lengthArray: Array<string> = [];

  currentSizeFilter: string;
  currentColorFilter: string;
  currentWaistFilter: string;
  currentLengthFilter: string;
  tagString: string;

  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService, private browsingService: BrowsingService,
    private dialog: MatDialog) {

  }

  ngOnInit() {

    this.shoppingCartService.currentShoppingCart.subscribe(
      shoppingCart => {
        this.shoppingCart = shoppingCart;
        console.log(this.shoppingCart);
      });

    this.browsingService.currentTag.subscribe(
      data => {
        this.tagString = data;
        console.log(this.tagString);
      })

    this.productService.getAllProducts().subscribe(
      data => {
        this.fullProductList = data;
        this.actualProductList = data;
        this.populateSizeArrays(this.actualProductList);
        console.log(this.sizeArray);
        this.populateColorArrays(this.actualProductList);
        console.log(this.colorArray);
      });
  }

  changeProductListByColor(filter: string) {
    let tempArray: Array<Product> = [];

    for (let product of this.actualProductList) {
      if (product.colors.includes(filter)) {
        tempArray.push(product);
      }
    }

    this.actualProductList = Object.assign([], tempArray);
  }


  changeProductListBySize(filter: string) {

    console.log(filter);
    //let tempArray: Array<Product> = [];

    //for (let product of this.actualProductList) {
    //  if (product.size.includes(filter)) {
    //    tempArray.push(product);
    //  }
    //}

    //this.actualProductList = Object.assign([], tempArray);
  }

  changeProductListByLength(filter: string) {
    let tempArray: Array<Product> = [];

    for (let product of this.actualProductList) {
      for (let sizes of product.size) {
        if (sizes.split('x')[0] == filter) {
          tempArray.push(product);
          break;
        }
      }
    }

    this.actualProductList = Object.assign([], tempArray);
  }


  changeProductListByWaist(filter: string) {
    let tempArray: Array<Product> = [];

    for (let product of this.actualProductList) {
      for (let sizes of product.size) {
        if (sizes.split('x')[1] == filter) {
          tempArray.push(product);
          break;
        }
      }
    }

    this.actualProductList = Object.assign([], tempArray);
  }


  onClickProduct(index: number) {
    const productDialog = this.dialog.open(ProductDialog, {
      data: this.actualProductList[index]
    });
  }

  populateSizeArrays(productArray: Array<Product>) {

    if (this.tagString != "bottoms") {
      for (let product of productArray) {
        for (let size of product.size) {
          if (!this.sizeArray.includes(size)) {
            this.sizeArray.push(size);
          }
        }
      }
    } else {
      for (let product of productArray) {
        for (let size of product.size) {
          let check = size.split('x');

          if (!this.waistArray.includes(check[0])) {
            this.waistArray.push(check[0]);
          }

          if (!this.lengthArray.includes(check[1])) {
            this.lengthArray.push(check[1]);
          }
          
        }
      }
    }

  }

  populateColorArrays(productArray: Array<Product>) {

    for (let product of productArray) {
      for (let color of product.colors) {
        if (!this.colorArray.includes(color)) {
          this.colorArray.push(color);
        }
      }
    }
  }


}
