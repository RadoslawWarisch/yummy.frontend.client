import { GeolocationItem } from "../../models/geolocation";
import * as fromActions from "../../actions/geolocation.actions";

export interface GeolocationState {
  data: GeolocationItem;
}

const initialState: any = {
  data: new GeolocationItem({
    lat: 50.067,
    lng: 19.945,
    zoom: 14,
    focusLat: 50.067,
    focusLng: 19.945
  })
};

export const geolocationReducer = (
  state: GeolocationState = initialState,
  action: fromActions.GeolocationActions
) => {
  switch (action.type) {
    case fromActions.FOCUS_SUCC:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data
        }
      };
    default:
      return state;
  }
};