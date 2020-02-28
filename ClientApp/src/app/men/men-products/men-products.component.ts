import { Component, OnInit } from '@angular/core';
import { BrowsingService } from '../../services/browsing-service';

@Component({
  selector: 'men-prod',
  templateUrl: './men-products.html',
  styleUrls: ['./men-products.css']
})

export class MenProductsComponent implements OnInit {

  tagString: string

  constructor(private browsingService: BrowsingService) {

  }

  ngOnInit() {
    this.browsingService.currentTag.subscribe(
      data => {
        this.tagString = data;
        console.log(this.tagString);
      })
  }
  
}
