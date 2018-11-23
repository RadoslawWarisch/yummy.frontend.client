import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { Store } from "@ngrx/store";
import { AppState } from "../../core/app-state";
import * as fromTransactionActions from "../../core/actions/transaction.actions";
import * as fromUserActions from "../../core/actions/user.actions";

@IonicPage({
  name: "map"
})
@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new fromTransactionActions.FetchTransactions({}));
    this.store.dispatch(new fromUserActions.FetchUser());
  }
}
