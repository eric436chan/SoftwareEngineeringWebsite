
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductOrder } from '../model/product.order.model';
import { ProductService } from '../services/product-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor(private productService: ProductService,
    private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private router: Router) {
    
  }


  onShopWomens() {
    this.router.navigate(['/womens']);
  }
  
  onShopMens() {
    this.router.navigate(['/mens']);
  }

}
