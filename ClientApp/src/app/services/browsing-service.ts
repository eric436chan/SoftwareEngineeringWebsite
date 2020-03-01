import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class BrowsingService {

  private tag: BehaviorSubject<string> = new BehaviorSubject("");
  currentTag = this.tag.asObservable();

  constructor() {
  }

  updateTag(tag: string) {
    this.tag.next(tag);
  }

}
