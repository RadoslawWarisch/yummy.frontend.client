
import {pluck} from 'rxjs/operators';
import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { Observable } from "rxjs";
import { Place } from "../../core/models/place";
import { Store } from "@ngrx/store";
import { AppState } from "../../core/app-state";

@IonicPage({
  name: "list"
})
@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage {
  public places$: Observable<Place[]>;
  public isLoading$: Observable<boolean>;
  public isExpanded: boolean = false;

  constructor(
    private store: Store<AppState>
  ) {
    this.subscribePlaces();
  }

  private subscribePlaces(): void {
    this.places$ = this.store.select("place").pipe(pluck("data"));
    this.isLoading$ = this.store.select("place").pipe(pluck("isFetching"));
  }

  public pullDown(): void {
    console.log('pull up')
  }
}
