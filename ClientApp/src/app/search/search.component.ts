import { Component, OnInit } from '@angular/core';
import { SearchingService } from '../services/searching-service';

@Component({
  selector: 'search',
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})

export class SearchComponent implements OnInit {

  searchString: string;

  constructor(private searchingService: SearchingService) {

  }

  ngOnInit() {
    this.searchingService.searchString.subscribe(
      data => {
        this.searchString = data;
        console.log(this.searchString);
      }
    )
  }
  
}
