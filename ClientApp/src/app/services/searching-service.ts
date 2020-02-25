import { EventEmitter } from "@angular/core";


export class SearchingService{

  searchString = new EventEmitter<string>();
  browsingString = new EventEmitter<string>();
}
