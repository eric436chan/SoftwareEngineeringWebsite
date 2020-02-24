import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from '../model/product.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  
  constructor(private http: HttpClient) {
    
  }

  getProducts() {
    return this.http.get('https://japswe-921d5.firebaseio.com/products.json').pipe(map(responseData => {
      const prodArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          prodArray.push({ ...responseData[key], id: key });
        }
      }
      return prodArray;
    }))
  }

  addProduct(product: Product) {
    this.http.post('https://japswe-921d5.firebaseio.com/products.json', product).subscribe(
      responseData => {
        console.log(responseData);
      });
  }
}
