import { Component, OnInit } from '@angular/core';
import { SearchingService } from '../services/searching-service';
import { ShoppingCartService } from '../services/shoppingCart-service';
import { ProductOrder } from '../model/product.order.model';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product-service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialog } from '../dialogs/productDialog/product-dialog.component';

@Component({
  selector: 'search',
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})

export class SearchComponent implements OnInit {

  searchString: string;
  shoppingCart: Array<ProductOrder>;
  exactProductList: Array<Product> = [];
  relatedProductList: Array<Product> = [];
  fullProductList: Array<Product> = [];

  constructor(private searchingService: SearchingService, private shoppingCartService: ShoppingCartService,
    private productService: ProductService, private dialog: MatDialog) {

  }

  ngOnInit() {

    this.searchingService.currentSearchString.subscribe(
      data => {
        this.searchString = data;
        console.log(this.searchString);
      })

    this.productService.getAllProducts().subscribe(
      data => {
        this.searchExactProducts(this.searchString, data);
        console.log(this.exactProductList);
        this.searchRelatedProducts(this.searchString, data);
        console.log(this.relatedProductList);
        
      });

    
   

    
   
    this.shoppingCartService.currentShoppingCart.subscribe(
      shoppingCart => {
        this.shoppingCart = shoppingCart;
        console.log(this.shoppingCart);
      })

   
  }

  //our search algorithm

  searchExactProducts(searchString, prodList) {

    let tempList: Array<Product> = [];

    for (let prod of prodList) {
      if (searchString.toLowerCase().includes(prod.tag.toLowerCase())) {
        tempList.push(prod)
        
      }
    }

    console.log(tempList)
    for (let prod of tempList) {

      if (searchString.toLowerCase().includes(prod.name.toLowerCase()) && !this.exactProductList.includes(prod)) {
        this.exactProductList.push(prod)
        
      }

      console.log(this.exactProductList)

      for (let size of prod.size) {
        if (searchString.toLowerCase().includes(size.toLowerCase()) && !this.exactProductList.includes(prod)) {
          this.exactProductList.push(prod)
          break;
        }
      }

      console.log(this.exactProductList)

      for (let color of prod.colors) {
        if (searchString.toLowerCase().includes(color.toLowerCase()) && !this.exactProductList.includes(prod)){
          this.exactProductList.push(prod)
          break;
        }
      }

      console.log(this.exactProductList)

    }


  }



  searchRelatedProducts(searchString, prodList) {

    
    let searchList = searchString.split(" ");


    for (let product of prodList) {
      for (let keyWord of searchList) {

        if ((product.tag.toLowerCase().includes(keyWord.toLowerCase()) ||
          product.name.toLowerCase().includes(keyWord.toLowerCase())) &&
          !this.relatedProductList.includes(product) && !this.exactProductList.includes(product)) {
          this.relatedProductList.push(product)
          break;
        }

        for (let desc of product.description) {
          if (desc.toLowerCase().includes(keyWord.toLowerCase()) &&
            !this.relatedProductList.includes(product) && !this.exactProductList.includes(product)) {
            this.relatedProductList.push(product)
            break;
          }
        }

        for (let color of product.colors) {
          if (color.toLowerCase().includes(keyWord.toLowerCase()) &&
            !this.relatedProductList.includes(product) && this.exactProductList.includes(product)) {
            this.relatedProductList.push(product)
            break;
          }
        }

        for (let size of product.size) {
          if (size.toLowerCase().includes(keyWord.toLowerCase()) &&
            !this.relatedProductList.includes(product) && this.exactProductList.includes(product)) {
            this.relatedProductList.push(product)
            break;
          }
        }



      }
    }
    //  //this.actualProductList = this.fullProductList;

    
  }

  onClickRelatedProduct(index: number) {
    const productDialog = this.dialog.open(ProductDialog, {
      data: this.relatedProductList[index]
    });
  }

  onClickExactProduct(index: number) {
    const productDialog = this.dialog.open(ProductDialog, {
      data: this.exactProductList[index]
    });
  }
  
}
