import { Component, OnInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SearchingService } from '../services/searching-service';
import { ShoppingCartService } from '../services/shoppingCart-service';
import { ProductOrder } from '../model/product.order.model';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingCartDialog } from '../dialogs/shoppingCartDialog/shopping-cart-dialog.component';
import { BrowsingService } from '../services/browsing-service';

@Component({
  selector: 'website-nav',
  templateUrl: './website-nav.html',
  styleUrls: ['./website-nav.css']
})

export class WebsiteNavComponent implements OnInit{


  shoppingCart: Array<ProductOrder> = [];


  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private router: Router,
    private searchingService: SearchingService, private shoppingCartService: ShoppingCartService, private browsingService: BrowsingService,
    private dialog: MatDialog) {
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/img/search-24px.svg'));
    iconRegistry.addSvgIcon('shopping-cart', sanitizer.bypassSecurityTrustResourceUrl('assets/img/shopping_cart-24px.svg'));

  }

  ngOnInit() {
    
    this.shoppingCartService.currentShoppingCart.subscribe(
      shoppingCart => {
        this.shoppingCart = shoppingCart;
        console.log(this.shoppingCart);
      });
  }


  onSearch(searchInput: HTMLInputElement) {

    if (searchInput.value != "") {
      this.router.navigate(['./search']);

      this.searchingService.searchString.emit(searchInput.value);
    }
  }

  onBrowseMen(tag: string) {
    this.browsingService.updateTag(tag);
    console.log("moving to men's products");
    this.router.navigate(['./mens/prod']);
  }

  onBrowseWomen(tag: string) {
    this.browsingService.updateTag(tag);
    console.log("moving to women's products");
    this.router.navigate(['./womens/prod']);
  }



  openShoppingCartDialog() {

    const shoppingCartDialog = this.dialog.open(ShoppingCartDialog, {
      data: this.shoppingCart
    });
  }
}
