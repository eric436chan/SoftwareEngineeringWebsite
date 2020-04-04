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

  colorList: Array<string> = [];
  sizeList: Array<string> = [];
  tagList: Array<string> = [];

  exactProductList: Array<Product> = [];
  relatedProductList: Array<Product> = [];
  

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

        for (let prod of data) {
          for (let color of prod.colors) {
            if (!this.colorList.includes(color.toLowerCase())) {
              this.colorList.push(color)
            }
          }

          for (let size of prod.size) {
            if (!this.sizeList.includes(size.toLowerCase())) {
              this.sizeList.push(size)
            }
          }

          if (!this.tagList.includes(prod.tag.toLowerCase())) {
            this.tagList.push(prod.tag)
          }
        }
      


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

    let tag: string;
    let color: string;
    let size: string;

    for (let checkSize of this.sizeList) {
      if (searchString.toLowerCase().includes(checkSize.toLowerCase())) {
        size = checkSize
        break;
      }
    }

    for (let checkColor of this.colorList) {
      if (searchString.toLowerCase().includes(checkColor.toLowerCase())) {
        color = checkColor
        break;
      }
    }

    for (let checkTag of this.tagList) {
      if (searchString.toLowerCase().includes(checkTag.toLowerCase())) {
        tag = checkTag
        break;
      }
    }

    //if all are defined
    if (size != undefined && tag != undefined && color != undefined) {
      for (let prod of prodList) {
        if (prod.size.includes(size) && prod.tag == tag && prod.colors.includes(color)) {
          this.exactProductList.push(prod)
        }
      }
      return
    }

    //if color is undefined
    if (size != undefined && tag != undefined) {
      for (let prod of prodList) {
        if (prod.size.includes(size) && prod.tag == tag) {
          this.exactProductList.push(prod)
        }
      }
      return
    }

    //if tag is undefined
    if (size != undefined && color != undefined) {
      for (let prod of prodList) {
        if (prod.size.includes(size) && prod.colors.includes(color)) {
          this.exactProductList.push(prod)
        }
      }
      return
    }

    //if size is undefined
    if (color != undefined && tag != undefined) {
      for (let prod of prodList) {
        if (prod.colors.includes(color) && prod.tag == tag) {
          this.exactProductList.push(prod)
        }
      }
      return
    }

    //if only size is defined
    if (size != undefined) {
      for (let prod of prodList) {
        if (prod.size.includes(size)) {
          this.exactProductList.push(prod)
        }
      }
      return
    }

    //if only color is defined
    if (color != undefined) {
      for (let prod of prodList) {
        if (prod.colors.includes(color)) {
          this.exactProductList.push(prod)
        }
      }
      return
    }

    //if only tag is defined
    if (tag != undefined) {
      for (let prod of prodList) {
        if (prod.tag == tag) {
          this.exactProductList.push(prod)
        }
      }
      return
    }
  }



  searchRelatedProducts(searchString, prodList) {

    let tempList: Array<Product> = [];

    for (let prod of prodList) {
      if (searchString.toLowerCase().includes(prod.tag.toLowerCase())) {
        tempList.push(prod)

      }
    }

    console.log(tempList)

    for (let prod of tempList) {
      if (!this.exactProductList.includes(prod) && !this.relatedProductList.includes(prod)) {
        this.relatedProductList.push(prod)
      }
    }

    console.log(this.relatedProductList)

    
    
   

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
