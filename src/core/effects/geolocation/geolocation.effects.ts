import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import * as fromActions from "../../actions/geolocation.actions";
import * as fromPlaceActions from "../../actions/place.actions";
import { GeolocationState } from "../../reducers/geolocation/geolocation.reducer";

@Injectable()
export class GeolocationEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  @Effect()
  public triggerFetch$ = this.actions$
    .ofType(fromActions.SET)
    .pluck("payload")
    .do((payload: GeolocationState) => {
      this.store.dispatch(new fromPlaceActions.FetchPlaces({
        coordinates: payload.data,
        page: 0,
        size: 12
      }))
    })
    .map((payload: GeolocationState) => new fromActions.SetSucc(payload));
}