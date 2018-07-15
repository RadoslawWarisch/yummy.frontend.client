import { GeolocationItem } from "../../models/geolocation";
import * as fromActions from "../../actions/geolocation.actions";

export interface GeolocationState {
  data: GeolocationItem;
}

const initialState: any = {
  data: new GeolocationItem({})
};

export const geolocationReducer = (
  state: GeolocationState = initialState,
  action: fromActions.GeolocationActions
) => {
  switch (action.type) {
    case fromActions.SET_SUCC:
      return {
        ...state,
        data: new GeolocationItem(action.payload.data)
      };
    default:
      return state;
  }
};