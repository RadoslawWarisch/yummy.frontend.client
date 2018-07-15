import { _Toast } from "../../models/_toast";
import * as fromActions from "../../actions/_toast.actions";

export interface _ToastState {
  data: _Toast;
}

const initialState: any = {
  data: new _Toast()
};

export const _toastReducer = (
  state: _ToastState = initialState,
  action: fromActions._ToastActions
) => {
  switch (action.type) {
    case fromActions.SHOW:
      return {
        ...state,
        data: new _Toast(true, action.payload)
      };
    case fromActions.HIDE:
      return {
        ...state,
        data: new _Toast()
      };
    default:
      return state;
  }
};
