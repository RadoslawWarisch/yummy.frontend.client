import { _Loader } from "../../models/_loader";
import * as fromActions from "../../actions/_loader.actions";

export interface _LoaderState {
  data: _Loader;
}

const initialState: any = {
  data: new _Loader()
};

export const _loaderReducer = (
  state: _LoaderState = initialState,
  action: fromActions._LoaderActions
) => {
  switch (action.type) {
    case fromActions.SHOW:
      return { 
        ...state,
        data: new _Loader(true, action.payload)
      };
    case fromActions.HIDE:
    return { 
      ...state,
      data: new _Loader()
    };
    default:
      return state;
  }
};