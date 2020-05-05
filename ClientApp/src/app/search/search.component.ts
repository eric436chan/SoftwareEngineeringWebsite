import { Component, OnInit } from '@angular/core';
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
  

  constructor(private productService: ProductService, private dialog: MatDialog) {

  }

  ngOnInit() {

    this.searchString = sessionStorage.getItem("searchString");


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
    this.shoppingCart = JSON.parse(sessionStorage.getItem("currentShoppingCart"));

   
  }

  //our search algorithm

  searchExactProducts(searchString: string, prodList: Array<Product>) {

    let tag: string;
    let color: string;
    let size: string;

    //get values for tag color and size
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
        if (prod.size.includes(size) && tag.toLowerCase().includes(prod.tag.toLowerCase()) && prod.colors.includes(color)) {
          this.exactProductList.push(prod)
        }
      }
      return
    }

    //if color is undefined
    if (size != undefined && tag != undefined) {
      for (let prod of prodList) {
        if (prod.size.includes(size) && tag.toLowerCase().includes(prod.tag.toLowerCase())) {
          this.exactProductList.push(prod)
        }
      }

      let tempArray = this.includeNameSearch(searchString, size, color, tag, this.exactProductList);
      if (tempArray.length != 0) {
        this.exactProductList = tempArray
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
      let tempArray = this.includeNameSearch(searchString, size, color, tag, this.exactProductList);
      if (tempArray.length != 0) {
        this.exactProductList = tempArray
      }
      return
    }

    //if size is undefined
    if (color != undefined && tag != undefined) {
      for (let prod of prodList) {
        if (prod.colors.includes(color) && tag.toLowerCase().includes(prod.tag.toLowerCase())) {
          this.exactProductList.push(prod)
        }
      }
      let tempArray = this.includeNameSearch(searchString, size, color, tag, this.exactProductList);
      if (tempArray.length != 0) {
        this.exactProductList = tempArray
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
      let tempArray = this.includeNameSearch(searchString, size, color, tag, this.exactProductList);
      if (tempArray.length != 0) {
        this.exactProductList = tempArray
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
      let tempArray = this.includeNameSearch(searchString, size, color, tag, this.exactProductList);
      if (tempArray.length != 0) {
        this.exactProductList = tempArray
      }
      return
    }

    //if only tag is defined
    if (tag != undefined) {
      for (let prod of prodList) {
        if (tag.toLowerCase().includes(prod.tag.toLowerCase())) {
          this.exactProductList.push(prod)
        }
      }
      let tempArray = this.includeNameSearch(searchString, size, color, tag, this.exactProductList);
      if (tempArray.length != 0) {
        this.exactProductList = tempArray
      }
      return
    }

    //if everything is undefined
    if (color == undefined && tag == undefined && size == undefined) {
      for (let word of this.searchString.split(" ")) {
        for (let prod of prodList) {
          if (prod.name.toLowerCase().includes(word.toLowerCase()) && !this.exactProductList.includes(prod)) {
            this.exactProductList.push(prod);
          }
        }
      }
      return
    }
  }



  searchRelatedProducts(searchString: string, prodList: Array<Product>) {

    let tag: string
    let color: string
    let size: string


    for (let checkTag of this.tagList) {
      if (searchString.toLowerCase().includes(checkTag.toLowerCase())) {
        tag = checkTag
        break;
      }
    }

    //just for tagging ignore everything else
    if (tag != null) {
      for (let prod of prodList) {
        if (tag.toLowerCase().includes(prod.tag.toLowerCase()) && !this.relatedProductList.includes(prod) && !this.exactProductList.includes(prod)) {
          this.relatedProductList.push(prod)
        }
      }
      console.log(this.relatedProductList)
      return;
    }

    for (let checkColor of this.colorList) {
      if (searchString.toLowerCase().includes(checkColor.toLowerCase())) {
        color = checkColor
        break;
      }
    }


    //just for color ignore everything else
    if (color != null) {
      for (let prod of prodList) {
        for (let prodColor of prod.colors) {
          if (color.toLowerCase() == prodColor.toLowerCase() && !this.relatedProductList.includes(prod) && !this.exactProductList.includes(prod)) {
            this.relatedProductList.push(prod)
          }
        }
      }
      console.log(this.relatedProductList)
      return;
    }


    for (let checkSize of this.sizeList) {
      if (searchString.toLowerCase().includes(checkSize.toLowerCase())) {
        size = checkSize
        break;
      }
    }

    //just for size ignore everything else
    if (size != null) {
      for (let prod of prodList) {
        for (let prodSize of prod.size) {
          if (size.toLowerCase() == prodSize.toLowerCase() && !this.relatedProductList.includes(prod) && !this.exactProductList.includes(prod)) {
            this.relatedProductList.push(prod)
          }
        }
      }
      console.log(this.relatedProductList)
      return;
    }



  }

  includeNameSearch(searchString: string, size: string, color: string, tag: string, productList: Array<Product>) {

    let tempArray: Array<Product> = [];

    for (let word of searchString.split(" ")) {
      for (let prod of productList) {
        if (word != size && word != color && word != tag && prod.name.toLowerCase().includes(word.toLowerCase()) && !tempArray.includes(prod)) {
          tempArray.push(prod)
        }
      }
     

    }

    return tempArray;


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
