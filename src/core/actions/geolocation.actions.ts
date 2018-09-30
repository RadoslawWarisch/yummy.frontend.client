import { Action } from "@ngrx/store";
import { GeolocationState } from "../reducers/geolocation/geolocation.reducer";

export const FOCUS = '[Geolocation] Focus';
export const FOCUS_SUCC = '[Geolocation] Focus Succ';
export const FOCUS_FAIL = '[Geolocation] Focus Fail';

export class Focus implements Action {
  readonly type = FOCUS;
  constructor(public payload: GeolocationState) {};
}

export class FocusSucc implements Action {
  readonly type = FOCUS_SUCC;
  constructor(public payload: GeolocationState) {};
}

export class FocusFail implements Action {
  readonly type = FOCUS_FAIL;
}

export type GeolocationActions = Focus | FocusSucc | FocusFail;