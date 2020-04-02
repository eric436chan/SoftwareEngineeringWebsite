import { Component, OnInit } from '@angular/core';
import { BrowsingService } from '../../services/browsing-service';
import { ShoppingCartService } from '../../services/shoppingCart-service';
import { ProductOrder } from '../../model/product.order.model';
import { ProductService } from '../../services/product-service';
import { Product } from '../../model/product.model';

@Component({
  selector: 'men-prod',
  templateUrl: './men-products.html',
  styleUrls: ['./men-products.css']
})

export class MenProductsComponent implements OnInit {

  shoppingCart: Array<ProductOrder>;
  tagString: string

  fullProductList: Array<Product>;
  actualProductList: Array<Product>;

  constructor(private browsingService: BrowsingService, private shoppingCartService: ShoppingCartService,
    private productService: ProductService) {

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
          if (prod.tag == this.tagString && prod.gender == "Male") {
            tempArray.push(prod);
          }
        }


        this.fullProductList = tempArray;
        this.actualProductList = tempArray;
        //get size array
        //this.populateSizeArrays(this.actualProductList);
        //if (this.tagString == "Shorts" || this.tagString == "Jeans") {
        //  this.sizeArray.sort();
        //  let tempNumberArray: Array<number> = [];
        //  let tempSizeArray: Array<string> = [];

        //  for (let size of this.sizeArray) {
        //    if (size == "0" || size == "00") {
        //      tempSizeArray.push(size);
        //    } else {
        //      tempNumberArray.push(Number(size))
        //    }
        //  }

        //  tempNumberArray.sort((n1, n2) => n1 - n2);
        //  for (let size of tempNumberArray) {
        //    tempSizeArray.push(size.toString());
        //  }
        //  if (tempSizeArray[0] == "0" && tempSizeArray[1] == "00") {
        //    let temp = tempSizeArray[0];
        //    tempSizeArray[0] = tempSizeArray[1];
        //    tempSizeArray[1] = temp;
        //  }

        //  this.sizeArray = tempSizeArray;
        //}

        //console.log(this.sizeArray);
        ////get color array
        //this.populateColorArrays(this.actualProductList);
        //this.colorArray.sort();
        //console.log(this.colorArray);


      });


    //adding products to database
    //for (let prod of this.addingProductList) {
    //  this.productService.addProduct(prod);
    //}
  }
  
}
