import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'men',
    templateUrl: './men.html',
    styleUrls: ['./men.css']
})

export class MenComponent {

  constructor(private router: Router) {

  }

  onBrowseMen(tag: string) {
    //this.browsingService.updateTag(tag);
    sessionStorage.setItem("currentManTag", tag);
    console.log("moving to men's products");
    this.router.navigate(['./mens/prod']);
  }

}
