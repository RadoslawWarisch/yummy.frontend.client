import { pluck } from "rxjs/operators";
import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { Store } from "@ngrx/store";
import { AppState } from "../../core/app-state";
import { Observable } from "rxjs";
import { Offer } from "../../core/models/offer";
import * as fromModalActions from '../../core/actions/_modal.actions';
import { _ModalType } from "../../core/models/_modal";

@IonicPage({
  name: "bucket"
})
@Component({
  selector: "page-bucket",
  templateUrl: "bucket.html"
})
export class BucketPage {
  public offers$: Observable<Offer[]>;
  public price$: Observable<number>;
  public count$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.offers$ = this.store.select("bucket").pipe(pluck("offers"));
    this.price$ = this.store.select("bucket").pipe(pluck("price"));
    this.count$ = this.store.select("bucket").pipe(pluck("count"));
  }

  public pullDown() {
    console.log("pullDown");
  }

  public showOffer(offerId: string): void {
    this.store.dispatch(
      new fromModalActions.Show({
        mode: _ModalType.OFFER,
        meta: {
          offerId: offerId,
          isBucket: true
        }
      })
    );
  }

  ionViewWillLeave(): void {
    this.store.dispatch(
      new fromModalActions.Hide()
    );
  }
}
