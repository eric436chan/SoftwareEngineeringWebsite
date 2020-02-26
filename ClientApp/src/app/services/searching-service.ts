import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SearchingService{

  searchString = new EventEmitter<string>();
  browsingString = new EventEmitter<string>();
}
