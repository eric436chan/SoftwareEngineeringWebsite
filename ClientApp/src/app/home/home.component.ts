
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ShoppingCartService } from '../services/shoppingCart-service';
import { ProductOrder } from '../model/product.order.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private shoppingCart: Array<ProductOrder>;

  constructor(private shoppingCartService: ShoppingCartService, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private router: Router) {
    // iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/img/search-24px.svg'));
    // iconRegistry.addSvgIcon('shopping-cart', sanitizer.bypassSecurityTrustResourceUrl('assets/img/shopping_cart-24px.svg'));
  }


  onShopWomens() {
    this.router.navigate(['/womens']);
  }
  
  onShopMens() {
    this.router.navigate(['/mens']);
  }

 


  ngOnInit() {
    this.shoppingCartService.currentShoppingCart.subscribe(
      shoppingCart => {
        this.shoppingCart = shoppingCart;
        console.log(this.shoppingCart);
      })
  }

}
