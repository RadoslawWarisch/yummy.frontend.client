import { _Alert } from "../../models/_alert";
import * as fromActions from "../../actions/_alert.actions";

export interface _AlertState {
  data: _Alert;
}

const initialState: any = {
  data: new _Alert()
};

export function _alertReducer (
  state: _AlertState = initialState,
  action: fromActions._AlertActions
) {
  switch (action.type) {
    case fromActions.SHOW:
      return { 
        ...state,
        data: new _Alert({
          isShown: true,
          ...action.payload
        })
      };
    case fromActions.HIDE:
    return { 
      ...state,
      data: new _Alert()
    };
    default:
      return state;
  }
};