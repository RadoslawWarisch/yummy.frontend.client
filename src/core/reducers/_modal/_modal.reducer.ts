import { _Modal } from "../../models/_modal";
import * as fromActions from "../../actions/_modal.actions";

export interface _ModalState {
  data: _Modal;
}

const initialState: any = {
  data: new _Modal(false)
};

export const _modalReducer = (
  state: _ModalState = initialState,
  action: fromActions._ModalActions
) => {
  switch (action.type) {
    case fromActions.SHOW:
      return { 
        ...state,
        data: new _Modal(true, action.payload.mode, action.payload.meta)
      };
    case fromActions.HIDE:
      return { 
        ...state,
        data: new _Modal(false)
      };
    default:
      return state;
  }
};