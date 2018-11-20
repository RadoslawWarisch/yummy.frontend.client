import { _Route } from "../../models/_route";
import * as fromActions from "../../actions/_route.actions";

declare const localStorage;

export interface _RouteState {
  data: _Route[];
}

const initialState: any = {
  data: [new _Route()]
};

export function _routeReducer(
  state: _RouteState = initialState,
  action: fromActions._RouteActions | any
) {
  switch (action.type) {
    case fromActions.ROOT:
      return {
        ...state,
        data: [new _Route(action.payload.name, action.payload.params)]
      };
    case fromActions.PUSH:
      return {
        ...state,
        data:
          state.data[state.data.length - 1].name === action.payload.name
            ? [...state.data]
            : [
                ...state.data,
                new _Route(action.payload.name, action.payload.params)
              ]
      };
    case fromActions.POP:
      return {
        ...state,
        data: [...state.data.slice(0, state.data.length - 1)].map(
          (route: _Route) => ({
            ...route,
            name: route.name === "initial" ? "map" : route.name
          })
        )
      };
    default:
      return state;
  }
}
