import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { empty } from 'rxjs';


@Component({
  selector: 'sizing',
  templateUrl: './sizing.html',
  styleUrls: ['./sizing.css']
})

export class SizingComponent {

  height: number;
  chestSize: number;
  armLength: number;
  waistWidth: number;
  inseamLength: number;
  currentGender: string;
  fitChest: string;
  fitArm: string;
  fitWaist: string;
  fitHeight: string;
  fitInseam: string;
  fit: string;
  currentSizeMap: Map<string, string> = new Map();
  computed: boolean = false;



  constructor(private snackBar: MatSnackBar) {

  }

  computeBestFitSize() {

    if (this.height == undefined || this.chestSize == undefined || this.armLength == undefined || this.waistWidth == undefined || this.inseamLength == undefined || this.currentGender == undefined) {
      this.snackBar.open("Not all fields are filled. Please fill out all fields.", null, { duration: 2000 })
      return;
    }

    console.log("Starting computation of size");
    this.computed = true;

    if (this.height != undefined && this.chestSize != undefined && this.armLength != undefined && this.waistWidth != undefined && this.inseamLength != undefined && this.currentGender == "Male") {

      let menTopSize: string = this.computeMenTops(this.chestSize, this.armLength, this.waistWidth, this.height);
      if (this.currentSizeMap.size != 0) {
        this.currentSizeMap.clear();
      }

      this.currentSizeMap.set("T-Shirt", menTopSize);
      this.currentSizeMap.set("Dress Shirt", menTopSize);
      this.currentSizeMap.set("Jacket", menTopSize);
      this.currentSizeMap.set("Shorts", this.computeMenLower(this.waistWidth));
      this.currentSizeMap.set("Jeans", this.waistWidth + "x" + this.inseamLength);
      console.log(this.currentSizeMap);
      return

    } else if (this.height != undefined && this.chestSize != undefined && this.armLength != undefined && this.waistWidth != undefined && this.inseamLength != undefined && this.currentGender == "Female") {

      let womenTopsize: string = this.computeWomenUpper(this.chestSize, this.waistWidth);

      if (this.currentSizeMap.size != 0) {
        this.currentSizeMap.clear();
      }

      this.currentSizeMap.set("Tops", womenTopsize);
      this.currentSizeMap.set("Sweaters", womenTopsize);
      this.currentSizeMap.set("Dress", this.computeWomenDress(this.waistWidth, this.chestSize));
      this.currentSizeMap.set("Shorts", this.computeWomenLower(this.waistWidth));
      this.currentSizeMap.set("Pants", this.computeWomenLower(this.waistWidth));
      this.currentSizeMap.set("Jeans", this.computeWomenJeans(this.waistWidth));
      console.log(this.currentSizeMap);
      return
    }
      
    




    

  }


  //get optimal size for mens tops
  computeMenTops(chestSize: number, armLength: number, waistWidth: number, height: number) {

    if (chestSize < 37) {
      this.fitChest = "X-Small";
    } else if (chestSize >= 37 && chestSize < 39) {
      this.fitChest = "Small";
    } else if (chestSize >= 39 && chestSize < 43) {
      this.fitChest = "Medium";
    } else if (chestSize >= 43 && chestSize < 47) {
      this.fitChest = "Large";
    } else if (chestSize >= 47) {
      this.fitChest = "X-Large";
    }


    if (armLength < 26.5) {
      this.fitArm = "X-Small";
    } else if (armLength >= 26.5 && armLength < 27) {
      this.fitArm = "Small";
    } else if (armLength >= 27 && armLength < 27.5) {
      this.fitArm = "Medium";
    } else if (armLength >= 27.5 && armLength < 28) {
      this.fitArm = "Large";
    } else if (armLength >= 28) {
      this.fitArm = "X-Large";
    }

    if (waistWidth < 29) {
      this.fitWaist = "X-Small";
    } else if (waistWidth >= 29 && waistWidth < 31) {
      this.fitWaist = "Small";
    } else if (waistWidth >= 31 && waistWidth < 33) {
      this.fitWaist = "Medium";
    } else if (waistWidth >= 33 && waistWidth < 35) {
      this.fitWaist = "Large";
    } else if (waistWidth >= 35) {
      this.fitWaist = "X-Large";
    }

    if (height < 5.6) {
      this.fitHeight = "X-Small";
    } else if (height >= 5.6 && height < 5.8) {
      this.fitHeight = "Small";
    } else if (height >= 5.8 && height < 5.10) {
      this.fitHeight = "Medium";
    } else if (height >= 5.10 && height < 6) {
      this.fitHeight = "Large";
    } else if (height >= 6) {
      this.fitHeight = "X-Large";
    }

    //reconfigure fits if necessary


    if (this.fitChest > this.fitArm) {
      this.fit = this.fitChest;
    } else {
      this.fit = this.fitArm;
    }
    
    if (this.fitWaist > this.fit) {
      this.fit = this.fitWaist;
    }

    if (this.fitHeight > this.fit) {
      this.fit = this.fitHeight;
    }

    return this.fit;

  }

  //get optimal size for men's lower clothing
  computeMenLower(waistWidth: number) {

    if (waistWidth < 29) {
      this.fitWaist = "X-Small";
    } else if (waistWidth >= 29 && waistWidth < 33) {
      this.fitWaist = "Small";
    } else if (waistWidth >= 33 && waistWidth < 36) {
      this.fitWaist = "Medium";
    } else if (waistWidth >= 36 && waistWidth < 39) {
      this.fitWaist = "Large";
    } else if (waistWidth >= 39) {
      this.fitWaist = "X-Large";
    }

    return this.fitWaist

  }

  computeWomenUpper(chestSize: number, waistWidth: number) {

    if (chestSize < 34) {
      this.fitChest = "X-Small";
    } else if (chestSize >= 34 && chestSize < 36) {
      this.fitChest = "Small";
    } else if (chestSize >= 36 && chestSize < 38.5) {
      this.fitChest = "Medium";
    } else if (chestSize >= 38.5 && chestSize < 42) {
      this.fitChest = "Large";
    } else if (chestSize >= 42) {
      this.fitChest = "X-Large";
    }

    if (waistWidth < 27.5) {
      this.fitWaist = "X-Small";
    } else if (waistWidth >= 27.5 && waistWidth < 29.5) {
      this.fitWaist = "Small";
    } else if (waistWidth >= 29.5 && waistWidth < 32) {
      this.fitWaist = "Medium";
    } else if (waistWidth >= 32 && waistWidth < 35) {
      this.fitWaist = "Large";
    } else if (waistWidth >= 35) {
      this.fitWaist = "X-Large";
    }

    if (this.fitChest > this.fitWaist) {
      this.fit = this.fitChest
    } else {
      this.fit = this.fitWaist
    }

    return this.fit
  }

  computeWomenDress(waistSize: number, chestSize: number) {

    if (waistSize < 28) {
      this.fitWaist = "X-Small";
    } else if (waistSize >= 28 && waistSize < 30) {
      this.fitWaist = "Small";
    } else if (waistSize >= 30 && waistSize < 33) {
      this.fitWaist = "Medium";
    } else if (waistSize >= 33 && waistSize < 37) {
      this.fitWaist = "Large";
    } else if (waistSize >= 37) {
      this.fitWaist = "X-Large";
    }

    if (chestSize < 34) {
      this.fitChest = "X-Small";
    } else if (chestSize >= 34 && chestSize < 35) {
      this.fitChest = "Small";
    } else if (chestSize >= 35 && chestSize < 37) {
      this.fitChest = "Medium";
    } else if (chestSize >= 37 && chestSize < 38) {
      this.fitChest = "Large";
    } else if (chestSize >= 38) {
      this.fitChest = "X-Large";
    }

    if (this.fitChest > this.fitWaist) {
      this.fit = this.fitChest;
    } else {
      this.fit = this.fitWaist
    }
    return this.fit
  }

  computeWomenLower(waistSize: number) {

    if (waistSize < 26) {
      this.fitWaist = "X-Small";
    } else if (waistSize >= 26 && waistSize < 29) {
      this.fitWaist = "Small";
    } else if (waistSize >= 29 && waistSize < 32) {
      this.fitWaist = "Medium";
    } else if (waistSize >= 32 && waistSize < 34) {
      this.fitWaist = "Large";
    } else if (waistSize >= 34) {
      this.fitWaist = "X-Large";
    }

    return this.fitWaist;
  }

  computeWomenJeans(waistSize: number) {

    switch (waistSize) {
      case 24: {
        return "00"
      }
      case 25: {
        return "0"
      }
      case 26: {
        return "1"
      }
      case 27: {
        return "3"
      }
      case 28: {
        return "5"
      }
      case 29: {
        return "7"
      }
      case 30: {
        return "9"
      }
      case 31: {
        return "11"
      }
      case 32: {
        return "13"
      }
      case 33: {
        return "15"
      }
      case 34: {
        return "17"
      }
    }
  }

}
