import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ShoppingCartService } from '../../services/shoppingCart-service';
import { ProductOrder } from '../../model/product.order.model';
import { Product } from '../../model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { ProductDialog } from '../../dialogs/productDialog/product-dialog.component';
import { BrowsingService } from '../../services/browsing-service';
import { Router } from '@angular/router';

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

  currentSizeFilter: string = "None";
  currentColorFilter: string = "None";
  currentSortOption: string = "None";
  tagString: string;

  addingProductList: Array<Product> = require('../women-products/products.json')

  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService, private browsingService: BrowsingService,
    private dialog: MatDialog, private router: Router) {

  }

  ngOnInit() {

    //get current shopping cart
    this.shoppingCartService.currentShoppingCart.subscribe(
      shoppingCart => {
        this.shoppingCart = shoppingCart;
        console.log(this.shoppingCart);
      });

    //get current browsing tag
    this.browsingService.currentTag.subscribe(
      data => {
        this.tagString = data;
        console.log(this.tagString);
      })

    //get products based on the tag
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
        //get size array
        this.populateSizeArrays(this.actualProductList);
        if (this.tagString == "Shorts" || this.tagString == "Jeans") {
          this.sizeArray.sort();
          let tempNumberArray: Array<number> = [];
          let tempSizeArray: Array<string> = [];

          for (let size of this.sizeArray) {
            if (size == "0" || size == "00") {
              tempSizeArray.push(size);
            } else {
              tempNumberArray.push(Number(size))
            }
          }

          tempNumberArray.sort((n1,n2) => n1-n2);
          for (let size of tempNumberArray) {
            tempSizeArray.push(size.toString());
          }

          this.sizeArray = tempSizeArray;
        }
       
        console.log(this.sizeArray);
        //get color array
        this.populateColorArrays(this.actualProductList);
        this.colorArray.sort();
        console.log(this.colorArray);
        

      });
    

    //adding products to database
    //for (let prod of this.addingProductList) {
    //  this.productService.addProduct(prod);
    //}
  }

  //filter product based on conditions
  filterProduct(color: string, size: string) {

    
    console.log("Filtering products...")

    if (size == "None" && color == "None") {
      console.log("Resetting all filters...");
      this.actualProductList = this.fullProductList;
      return;
    }

    if (size != "None" && color != "None") {
      this.actualProductList = this.fullProductList.filter(function (Product) {
        return Product.size.includes(size);
      })
      this.actualProductList = this.fullProductList.filter(function (Product) {
        return Product.colors.includes(color);
      })

      console.log("Found products with size " + size + " and color " + color)

      return;
    }

    if (size != "None") {
      this.actualProductList = this.fullProductList.filter(function (Product) {
        return Product.size.includes(size);
      })
      console.log("Found products with size " + size)

      return;
    }

    if (color != "None") {
      this.actualProductList = this.fullProductList.filter(function (Product) {
        return Product.colors.includes(color);
      })
      console.log("Found products with color " + color)

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


  //clicking product to open pop up
  onClickProduct(index: number) {
    const productDialog = this.dialog.open(ProductDialog, {
      data: this.actualProductList[index]
    });
  }

  populateSizeArrays(productArray: Array<Product>) {

      for (let product of productArray) {
        for (let size of product.size) {
          if (!this.sizeArray.includes(size)) {
            this.sizeArray.push(size);
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

  onSort() {

    console.log("Sorting products...");

    if (this.currentSortOption == "None") {

      console.log("Resetting all sort filters...")
      this.actualProductList = this.fullProductList;
      return;
    }

    if (this.currentSortOption == "High to Low") {

      console.log("Sorting products by price: ", this.currentSortOption)
      this.actualProductList.sort((p1, p2) => (p2.price - p1.price))
      return;
    }

    if (this.currentSortOption == "Low to High") {

      console.log("Sorting products by price: ", this.currentSortOption)
      this.actualProductList.sort((p1, p2) => (p1.price - p2.price))
      return;
    }

    if (this.currentSortOption == "A to Z") {

      console.log("Sorting products by alphabetical: ", this.currentSortOption)
      this.actualProductList.sort((p1, p2) => 0 - (p1.name > p2.name ? -1 : 1));
      return;
    }

    if (this.currentSortOption == "Z to A") {

      console.log("Sorting products by alphabetical: ", this.currentSortOption)
      this.actualProductList.sort((p1, p2) => 0 - (p1.name > p2.name ? 1 : -1));
      return;
    }

    
  }

}
