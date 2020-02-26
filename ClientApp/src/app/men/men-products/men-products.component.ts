import { Component, OnInit } from '@angular/core';
import { SearchingService } from '../../services/searching-service';

@Component({
  selector: 'men-prod',
  templateUrl: './men-products.html',
  styleUrls: ['./men-products.css']
})

export class MenProductsComponent implements OnInit {

  browsingString: string

  constructor(private searchService: SearchingService) {

  }

  ngOnInit() {
    this.searchService.browsingString.subscribe(
      data => {
        this.browsingString = data;
        console.log(data);
      })
  }

}
