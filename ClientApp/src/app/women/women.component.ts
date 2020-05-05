import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'womens',
  templateUrl: './women.html',
  styleUrls: ['./women.css']
})

export class WomenComponent {

  constructor(private router: Router) {

  }

  onBrowseWomen(tag: string) {
    sessionStorage.setItem("currentWomanTag", tag);
    console.log("moving to women's products");
    this.router.navigate(['./womens/prod']);
  }

}
