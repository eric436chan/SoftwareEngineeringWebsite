import { Component, OnInit } from '@angular/core';
import { SearchingService } from '../services/searching-service';
import { ShoppingCartService } from '../services/shoppingCart-service';
import { ProductOrder } from '../model/product.order.model';

@Component({
  selector: 'search',
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})

export class SearchComponent implements OnInit {

  searchString: string;
  shoppingCart: Array<ProductOrder>;

  constructor(private searchingService: SearchingService, private shoppingCartService: ShoppingCartService) {
    searchingService.searchString.subscribe(data => {
      this.searchString = data;
      console.log(this.searchString);
    })
  }

  ngOnInit() {
    
    this.shoppingCartService.currentShoppingCart.subscribe(
      shoppingCart => {
        this.shoppingCart = shoppingCart;
        console.log(this.shoppingCart);
      })
  }
  
}
