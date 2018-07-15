import { Action } from "@ngrx/store";
import { GeolocationState } from "../reducers/geolocation/geolocation.reducer";

export const SET = '[Geolocation] Set';
export const SET_SUCC = '[Geolocation] Set Succ';
export const SET_FAIL = '[Geolocation] Set Fail';

export class Set implements Action {
  readonly type = SET;
  constructor(public payload: GeolocationState) {};
}

export class SetSucc implements Action {
  readonly type = SET_SUCC;
  constructor(public payload: GeolocationState) {};
}

export class SetFail implements Action {
  readonly type = SET_FAIL;
}

export type GeolocationActions = Set | SetSucc | SetFail;