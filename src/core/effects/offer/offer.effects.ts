import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as fromActions from "../../actions/offer.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { OfferProvider } from "../../providers/offer-provider/offer-provider";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";

@Injectable()
export class OfferEffects {

  constructor(
    private actions$: Actions,
    private offerProvider: OfferProvider,
    private store: Store<AppState>
  ) {}

  @Effect()
  public getOffers$ = this.actions$
    .ofType(fromActions.FETCH_OFFERS)
    .pluck("payload")
    .switchMap((payload: any) => this.offerProvider.getOffers(payload))
    .map((res: any | HttpErrorResponse) => {
      return (!(res instanceof HttpErrorResponse) && res.offers)
        ? new fromActions.FetchOffersSucc(res.offers)
        : new fromActions.FetchOffersFail;
    });
}
