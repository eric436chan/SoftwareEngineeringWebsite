import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchingService{


  private searchString: BehaviorSubject<string> = new BehaviorSubject("");
  currentSearchString = this.searchString.asObservable();

  updateSearchString(searchString: string) {
    this.searchString.next(searchString);
  }
 
}
