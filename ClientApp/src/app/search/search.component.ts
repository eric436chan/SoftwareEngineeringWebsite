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
  actualProductList: Array<Product>;
  fullProductList: Array<Product>;

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
        this.fullProductList = data;
        this.searchProducts(this.searchString, data);
      });

    
   
    this.shoppingCartService.currentShoppingCart.subscribe(
      shoppingCart => {
        this.shoppingCart = shoppingCart;
        console.log(this.shoppingCart);
      })

   
  }

  //our search algorithm
  searchProducts(searchString, prodList) {

    console.log(prodList);
    let tempArray: Array<Product> = [];
    let searchList = searchString.split(" ");


    for (let product of prodList) {
      for (let keyWord of searchList) {

        if ((product.tag.toLowerCase().includes(keyWord.toLowerCase()) ||
          product.name.toLowerCase().includes(keyWord.toLowerCase())) &&
          !tempArray.includes(product)) {
          tempArray.push(product)
          break;
        }

        for (let desc of product.description) {
          if (desc.toLowerCase().includes(keyWord.toLowerCase()) && !tempArray.includes(product)) {
            tempArray.push(product)
            break;
          }
        }

        for (let color of product.colors) {
          if (color.toLowerCase().includes(keyWord.toLowerCase()) && !tempArray.includes(product)) {
            tempArray.push(product)
            break;
          }
        }

        for (let size of product.size) {
          if (size.toLowerCase().includes(keyWord.toLowerCase()) && !tempArray.includes(product)) {
            tempArray.push(product)
            break;
          }
        }



      }
    }
  
    console.log(tempArray);
    this.actualProductList = tempArray;
    console.log(this.actualProductList);
    //  //this.actualProductList = this.fullProductList;

    
  }

  onClickProduct(index: number) {
    const productDialog = this.dialog.open(ProductDialog, {
      data: this.actualProductList[index]
    });
  }
  
}
