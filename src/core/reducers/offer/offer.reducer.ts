import { ActionReducer, Action } from "@ngrx/store";
import { Offer } from "../../models/offer";
import * as fromAction from "../../actions/offer.actions";

export interface OfferState {
  data: Offer[],
  restaurantId?: string,
  isFetching?: boolean
}

const initialState: OfferState = {
  data: [],
  isFetching: false
};

export const offerReducer: ActionReducer<OfferState> = (
  state: OfferState = initialState,
  action: Action | any
) => {
  switch (action.type) {
    case fromAction.FETCH_OFFERS:
      return {
        ...state,
        data: state.restaurantId === action.payload.restaurantId 
          ? state.data 
          : [],
        isFetching: state.restaurantId !== action.payload.restaurantId,
        restaurantId: action.payload.restaurantId
      }
    case fromAction.FETCH_OFFERS_SUCC:
      return {
        ...state,
        data: action.payload.map((offer: Offer) => new Offer(offer)),
        isFetching: false
      }
    case fromAction.FETCH_OFFERS_FAIL:
      return {
        ...state,
        isFetching: false
      }
    case fromAction.EXPAND_OFFER:
      return {
        ...state,
        data: state.data.map((offer: Offer) => ({
          ...offer,
          isExpanded: offer.id === action.payload
        }))
      }
    default:
      return state;
  }
};
