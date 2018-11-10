import { Action } from "@ngrx/Store";

export const FETCH_OFFERS = "[Offer] Fetch Offers";
export const FETCH_OFFERS_SUCC = "[Offer] Fetch Offers Succ";
export const FETCH_OFFERS_FAIL = "[Offer] Fetch Offers Fail";
export const EXPAND_OFFER = "[Offer] Expand Offer";

export class FetchOffers implements Action {
  readonly type = FETCH_OFFERS;
  constructor(public payload: any) {}
}
export class FetchOffersSucc implements Action {
  readonly type = FETCH_OFFERS_SUCC;
  constructor(public payload: any) {}
}
export class FetchOffersFail implements Action {
  readonly type = FETCH_OFFERS_FAIL;
}

export class ExpandOffer implements Action {
  readonly type = EXPAND_OFFER;
  constructor(public payload: string) {}
}

export type OfferActions = FetchOffers | FetchOffersSucc | FetchOffersFail | ExpandOffer;
