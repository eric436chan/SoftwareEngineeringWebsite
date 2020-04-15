import { Component, OnInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductOrder } from '../model/product.order.model';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingCartDialog } from '../dialogs/shoppingCartDialog/shopping-cart-dialog.component';
import { ProductService } from '../services/product-service';
import { Product } from '../model/product.model';

@Component({
  selector: 'website-nav',
  templateUrl: './website-nav.html',
  styleUrls: ['./website-nav.css']
})

export class WebsiteNavComponent{


  shoppingCart: Array<ProductOrder> = [];

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private router: Router, private dialog: MatDialog, private productService: ProductService) {
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/img/search-24px.svg'));
    iconRegistry.addSvgIcon('shopping-cart', sanitizer.bypassSecurityTrustResourceUrl('assets/img/shopping_cart-24px.svg'));

  }

  onSearch(searchInput: HTMLInputElement) {

    if (searchInput.value != "") {
      sessionStorage.setItem("searchString", searchInput.value);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['./search']);
      }); 

    }
  }

  onBrowseMen(tag: string) {
    //this.browsingService.updateTag(tag);
    sessionStorage.setItem("currentManTag", tag);
    console.log("moving to men's products");
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['./mens/prod']);
    }); 
  }

  onBrowseWomen(tag: string) {
    sessionStorage.setItem("currentWomanTag", tag);
    console.log("moving to women's products");
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['./womens/prod']);
    }); 
  }

  openShoppingCartDialog() {

    const shoppingCartDialog = this.dialog.open(ShoppingCartDialog, {
      data: this.shoppingCart
    });
  }
}
