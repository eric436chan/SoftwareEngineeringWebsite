import { Component, OnInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SearchingService } from '../services/searching-service';
import { ShoppingCartService } from '../services/shoppingCart-service';
import { ProductOrder } from '../model/product.order.model';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingCartDialog } from '../dialogs/shoppingCartDialog/shopping-cart-dialog.component';

@Component({
  selector: 'website-nav',
  templateUrl: './website-nav.html',
  styleUrls: ['./website-nav.css']
})

export class WebsiteNavComponent{


  shoppingCart: Array<ProductOrder> = [];


  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private router: Router,
    private searchingService: SearchingService, private shoppingCartService: ShoppingCartService,
    private dialog: MatDialog) {
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/img/search-24px.svg'));
    iconRegistry.addSvgIcon('shopping-cart', sanitizer.bypassSecurityTrustResourceUrl('assets/img/shopping_cart-24px.svg'));

  }


  onSearch(searchInput: HTMLInputElement) {


    if (searchInput.value != "") {
      this.router.navigate(['./search']);

      this.searchingService.searchString.emit(searchInput.value);
    }
  }

  onBrowseMen(tag: string) {
    this.searchingService.browsingString.emit(tag)
    this.router.navigate(['./mens/prod']);
  }

  openShoppingCartDialog() {

    const shoppingCartDialog = this.dialog.open(ShoppingCartDialog);

    shoppingCartDialog.afterClosed().subscribe(data =>
    {
      console.log('dialog was closed');
    })
    

  }
}
