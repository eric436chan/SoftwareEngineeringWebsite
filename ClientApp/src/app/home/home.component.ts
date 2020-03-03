import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private router: Router) {
    // iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/img/search-24px.svg'));
    // iconRegistry.addSvgIcon('shopping-cart', sanitizer.bypassSecurityTrustResourceUrl('assets/img/shopping_cart-24px.svg'));
  }

  ngOnInit(): void {
  }

  onShopWomens() {
    this.router.navigate(['/womens']);
  }
  
  onShopMens() {
    this.router.navigate(['/mens']);
  }

}
