import { ActionReducer, Action } from "@ngrx/store";
import { Place } from "../../models/place";
import * as fromAction from "../../actions/place.actions";

export interface PlaceState {
  data: Place[];
  isFetching?: boolean;
}

const initialState: PlaceState = {
  data: [],
  isFetching: false
};

export const placeReducer: ActionReducer<PlaceState> = (
  state: PlaceState = initialState,
  action: Action | any
) => {
  switch (action.type) {
    case fromAction.FETCH_PLACES:
      return {
        ...state,
        isFetching: true
      };
    case fromAction.FETCH_PLACES_SUCC:
      return {
        ...state,
        data: action.payload,
        isFetching: false
      };
    case fromAction.FETCH_PLACES_FAIL:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};
