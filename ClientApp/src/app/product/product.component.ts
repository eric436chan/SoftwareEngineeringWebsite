import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service';
import { Product } from '../model/product.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'website-product',
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})

export class ProductComponent {


  products: Product[] = [];
 
  ngOnInit() {

    this.productService.getAllProducts().subscribe(
      products => {
        this.products = products;
      })
  }

  constructor(private productService: ProductService) {

  }
  
 


}
