import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from '../model/product.model';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class ProductService {


  constructor(private http: HttpClient) {

  }

  getAllProducts() {
    return this.http.get('https://japswe-921d5.firebaseio.com/products.json', {
      //params: new HttpParams().set('orderBy', '"$key"').set('equalTo', '"-M0y0z8v60ZSEBdRTJoD"')
    }
    ).pipe(map(responseData => {
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

  getProductByTag(tag: string) {
    let searchParams = new HttpParams();
    searchParams.append('orderBy', 'tag');
    searchParams.append('equalTo', tag);


    return this.http.get('https://japswe-921d5.firebaseio.com/products.json',
      {
        params: searchParams
      }).pipe(map(responseData => {
        const prodArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            prodArray.push({ ...responseData[key], id: key });
          }
        }
        return prodArray;
      }))
  }

 
}
