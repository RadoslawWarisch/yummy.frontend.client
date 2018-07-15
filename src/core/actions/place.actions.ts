import { Action } from "@ngrx/store";
import { Place } from "../models/place";
import { GetPlacesBody } from "../providers/rest/rest";

export const FETCH_PLACES = "[Place] Fetch Places";
export const FETCH_PLACES_SUCC = "[Place] Fetch Places Succ";
export const FETCH_PLACES_FAIL = "[Place] Fetch Places Fail";

export class FetchPlaces implements Action {
  readonly type = FETCH_PLACES;
  constructor(public payload: GetPlacesBody) {}
}

export class FetchPlacesSucc implements Action {
  readonly type = FETCH_PLACES_SUCC;
  constructor(public payload: Place[]) {}
}

export class FetchPlacesFail implements Action {
  readonly type = FETCH_PLACES_FAIL;
}

export type PlaceActions =
  | FetchPlaces
  | FetchPlacesSucc
  | FetchPlacesFail;