import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SearchingService{

  searchString = new EventEmitter<string>();
  tagString = new EventEmitter<string>();
}
