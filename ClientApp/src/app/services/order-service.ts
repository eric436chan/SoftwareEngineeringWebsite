import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Order } from "../model/order.model";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {

  }

  getOrder(orderKey: string) {
    return this.http.get('https://japswe-921d5.firebaseio.com/orders.json', {
      params: new HttpParams().set('orderBy', '"$key"').set('equalTo', orderKey)
    }
    ).pipe(map(responseData => {
      const orderArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          orderArray.push({ ...responseData[key], id: key });
        }
      }
      return orderArray;
    }))
  }

  addOrder(order: Order) {
    return this.http.post('https://japswe-921d5.firebaseio.com/orders.json', order).subscribe(
      data => {
        console.log(data);
      })
  }

}
