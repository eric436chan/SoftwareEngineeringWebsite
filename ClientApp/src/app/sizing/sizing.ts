import { Component } from '@angular/core';


@Component({
  selector: 'sizing',
  templateUrl: './sizing.html',
  styleUrls: ['./sizing.css']
})

export class SizingComponent {

  height: string;
  shoulderWidth: string;
  wasitWidth: string;
  legLength: string;
  tag: string

  constructor() {

  }

  computeBestFitSize(height: string, shoulderWidth: string, waistWidth: string, legLength: string) {


    //write code to compute




    return "Small";

  }


}
