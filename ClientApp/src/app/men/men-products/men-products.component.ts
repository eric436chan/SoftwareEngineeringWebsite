import { Component, OnInit } from '@angular/core';
import { ProductOrder } from '../../model/product.order.model';
import { ProductService } from '../../services/product-service';
import { Product } from '../../model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialog } from '../../dialogs/productDialog/product-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'men-prod',
  templateUrl: './men-products.html',
  styleUrls: ['./men-products.css']
})

export class MenProductsComponent implements OnInit {

  shoppingCart: Array<ProductOrder>;
  tagString: string

  sizeArray: Array<string> = []
  colorArray: Array<string> = []
  waistArray: Array<string> = [];
  lengthArray: Array<string> = [];

  currentSizeFilter: string = "None";
  currentColorFilter: string = "None";
  currentWaistFilter: string = "None";
  currentLengthFilter: string = "None";
  currentSortOption: string = "None";

  fullProductList: Array<Product>;
  actualProductList: Array<Product>;

  constructor(private productService: ProductService, private dialog: MatDialog, private router: Router) {

  }

  ngOnInit() {

    //get current shopping cart
    this.shoppingCart = JSON.parse(sessionStorage.getItem("currentShoppingCart"));

    //get current browsing tag
    this.tagString = sessionStorage.getItem("currentManTag");
    if (this.tagString == undefined || this.tagString == null) {
      this.router.navigate(['./']);
    }
    console.log(this.tagString);

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
        this.populateSizeArrays(this.actualProductList);
        if (this.tagString == "Jeans") {
          this.waistArray.sort();
          this.lengthArray.sort();
          console.log(this.waistArray)
          console.log(this.lengthArray)
        } else {
          console.log(this.sizeArray);
        }

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

  populateSizeArrays(productArray: Array<Product>) {


    if (this.tagString != "Jeans") {
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
          let sizeSplit = size.split("x");
          if (!this.waistArray.includes(sizeSplit[0])) {
            this.waistArray.push(sizeSplit[0]);
          }
          if (!this.lengthArray.includes(sizeSplit[1])) {
            this.lengthArray.push(sizeSplit[1]);
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

  onClickProduct(index: number) {
    const productDialog = this.dialog.open(ProductDialog, {
      data: this.actualProductList[index]
    });
  }


  filterProduct(color: string, size: string, waist: string, length: string) {

    //filtering option for jeans
    if (this.tagString == "Jeans") {
      console.log("Filtering products...");

      if (color == "None" && waist == "None" && length == "None") {
        console.log("Resetting all filters...");
        this.actualProductList = this.fullProductList;
        return;
      }

      if (color != "None" && waist != "None" && length != "None") {
        this.actualProductList = this.fullProductList.filter(function (Product) {
          return Product.colors.includes(color);
        })

        let tempArray: Array<Product> = []

        for (let prod of this.fullProductList) {
          for (let size of prod.size) {
            if (size.split("x")[0] == waist && size.split("x")[1] == length) {
              tempArray.push(prod)
              break;
            }
           
          }
        }

        console.log("Found products with color " + color + ", waist " + waist + ", and length " + length);
        this.actualProductList = tempArray
        return;
      }

      if (color != "None" && waist != "None") {
        this.actualProductList = this.fullProductList.filter(function (Product) {
          return Product.colors.includes(color);
        })
        let tempArray: Array<Product> = []

        for (let prod of this.actualProductList) {
          for (let size of prod.size) {
            if (size.split("x")[0] == waist) {
              tempArray.push(prod)
              break;
            }
           
          }
        }
        console.log("Found products with color " + color + " and waist " + waist);
        this.actualProductList = tempArray
        return;

      }

      if (color != "None" && length != "None") {
        this.actualProductList = this.fullProductList.filter(function (Product) {
          return Product.colors.includes(color);
        })
        let tempArray: Array<Product> = []

        for (let prod of this.actualProductList) {
          for (let size of prod.size) {
            if (size.split("x")[1] == length) {
              tempArray.push(prod)
              break;
            }
            
          }
        }

        console.log("Found products with color " + color + " and length " + length);
        this.actualProductList = tempArray
        return;

      }

      if (length != "None" && waist != "None") {

        let tempArray: Array<Product> = [];

        for (let prod of this.fullProductList) {
          for (let size of prod.size) {
            if (size.split("x")[0] == waist && size.split("x")[1] == length) {
              tempArray.push(prod)
              break;
            }
           
          }
        }

        console.log("Found products with waist " + waist + " and length " + length);
        this.actualProductList = tempArray
        return;

      }

      if (color != "None") {
        this.actualProductList = this.fullProductList.filter(function (Product) {
          return Product.colors.includes(color);
        })
        console.log("Found products with color " + color)
      }

      if (waist != "None") {
        let tempArray: Array<Product> = [];

        for (let prod of this.fullProductList) {
          for (let size of prod.size) {
            if (size.split("x")[0] == waist) {
              tempArray.push(prod)
              break;
            }
            
          }
        }

        console.log("Found products with waist " + waist);

        this.actualProductList = tempArray
        return;

      }
      if (length != "None") {
      let tempArray: Array<Product> = [];

      for (let prod of this.fullProductList) {
        for (let size of prod.size) {
          if (size.split("x")[1] == length) {
            tempArray.push(prod)
            break;
          }
         
        }
      }

        console.log("Found products with length " + length);
      this.actualProductList = tempArray
      return;

      }
    }

    //filtering option for non jeans
    console.log("Filtering products...");

    if (size == "None" && color == "None") {
      console.log("Resetting all filters...");
      this.actualProductList = this.fullProductList
      return;
    }

    if (size != "None" && color != "None") {
      this.actualProductList = this.fullProductList.filter(function (Product) {
        return Product.size.includes(size);
      })
      this.actualProductList = this.actualProductList.filter(function (Product) {
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

  onSort() {

    console.log("Sorting products...");

    if (this.currentSortOption == "None") {

      console.log("Resetting all sort filters...")
      let currentIndex = this.actualProductList.length - 1;

      while (0 !== currentIndex) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        let temporaryValue = this.actualProductList[currentIndex];
        this.actualProductList[currentIndex] = this.actualProductList[randomIndex];
        this.actualProductList[randomIndex] = temporaryValue;
      }

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
