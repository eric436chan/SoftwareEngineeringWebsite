import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ShoppingCartService } from '../../services/shoppingCart-service';
import { ProductOrder } from '../../model/product.order.model';
import { Product } from '../../model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
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

  addingProductList: Array<Product> = require('../women-products/products.json')

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

        let tempArray: Array<Product> = [];
        for (let prod of data) {
          if (prod.tag == this.tagString) {
            tempArray.push(prod);
          }
        }

        this.fullProductList = tempArray;
        this.actualProductList = tempArray;
        this.populateSizeArrays(this.actualProductList);
        console.log(this.sizeArray);
        this.populateColorArrays(this.actualProductList);
        console.log(this.colorArray);
        

      });
    

    //for (let prod of this.addingProductList) {
    //  this.productService.addProduct(prod);
    //}
  }

  filterProduct(color: string, size: string) {

    console.log("Filtering products...")

      if (size != undefined && color != undefined) {
        this.actualProductList = this.fullProductList.filter(function (Product) {
          return Product.size.includes(size);
        })
        this.actualProductList = this.fullProductList.filter(function (Product) {
          return Product.colors.includes(color);
        })

        console.log("Found products with size " + size + " and color " + color)
        return;
      }

      if (size != undefined) {
        this.actualProductList = this.fullProductList.filter(function (Product) {
          return Product.size.includes(size);
        })
        console.log("Found products with size " + size)
        return;
      }

      if (color != undefined) {
        this.actualProductList = this.fullProductList.filter(function (Product) {
          return Product.colors.includes(color);
        })
        console.log("Found products with size " + color)
        return;
      }
  }

  

  //changeProductListByColor(filter: string) {

  //  console.log("Filtering products for color: " + filter);
  //  this.actualProductList = this.fullProductList.filter(function (Product) {
  //    return Product.colors.includes(filter);
  //  })
  //}

  //changeProductListBySize(filter: string) {

  //  console.log("Filtering products for size: " + filter);
  //  this.actualProductList = this.fullProductList.filter(function (Product) {
  //    return Product.size.includes(filter);
  //  })
  //}

  //changeProductListByLength(filter: string) {

  //  let tempArray: Array <Product> = [];
  //  for (let product of this.fullProductList) {
  //    for (let size of product.size) {
  //      if (size.split('x')[0] == filter) {
  //        tempArray.push(product);
  //        break;
  //      }
  //    }
  //  }
  //  this.actualProductList = Object.assign([], tempArray);
  //}


  //changeProductListByWaist(filter: string) {
  //  let tempArray: Array<Product> = [];

  //  for (let product of this.actualProductList) {
  //    for (let sizes of product.size) {
  //      if (sizes.split('x')[1] == filter) {
  //        tempArray.push(product);
  //        break;
  //      }
  //    }
  //  }

  //  this.actualProductList = Object.assign([], tempArray);
  //}


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
