import { pluck } from "rxjs/operators";
import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { Place } from "../../core/models/place";
import { Observable } from "rxjs";
import { Offer } from "../../core/models/offer";
import { Store } from "@ngrx/store";
import { AppState } from "../../core/app-state";
import * as fromOfferActions from "../../core/actions/offer.actions";
import { _ModalType } from "../../core/models/_modal";
import * as fromModalActions from "../../core/actions/_modal.actions";

@IonicPage({
  name: "offers"
})
@Component({
  selector: "page-offers",
  templateUrl: "offers.html"
})
export class OffersPage {
  public place: Place;
  public offers$: Observable<Offer[]>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.offers$ = this.store.select("offer").pipe(pluck("data"));
    this.isLoading$ = this.store.select("offer").pipe(pluck("isFetching"));
  }

  ionViewWillEnter() {
    this.store.dispatch(
      new fromOfferActions.FetchOffers({
        restaurantId: null
      })
    );
  }

  public pullDown(): void {
    console.log("pull up");
  }

  public showOffer(offerId: string): void {
    this.store.dispatch(
      new fromModalActions.Show({
        mode: _ModalType.OFFER,
        meta: {
          offerId: offerId,
          isBucket: false
        }
      })
    );
  }

  ionViewWillLeave(): void {
    this.store.dispatch(new fromModalActions.Hide());
  }
}
