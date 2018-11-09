import { map, tap, pluck, switchMap, take } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import * as fromActions from "../../actions/geolocation.actions";
import * as fromPlaceActions from "../../actions/place.actions";
import { GeolocationState } from "../../reducers/geolocation/geolocation.reducer";

@Injectable()
export class GeolocationEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  @Effect()
  public triggerFetch$ = this.actions$.ofType(fromActions.FOCUS).pipe(
    pluck("payload"),
    switchMap(
      () => this.store.select((state) => state.geolocation).pipe(take(1)),
      (focusState: GeolocationState, storeState: GeolocationState) => ({
        data: {
          ...storeState.data,
          ...focusState.data
        }
      })
    ),
    tap((payload: GeolocationState) => {
      this.store.dispatch(
        new fromPlaceActions.FetchPlaces({
          coordinates: {
            user: {
              lat: payload.data.lat,
              lon: payload.data.lng
            },
            focus: {
              lat: payload.data.focusLat,
              lon: payload.data.focusLng
            }
          },
          page: 0,
          size: 12
        })
      );
    }),
    map((payload: GeolocationState) => new fromActions.FocusSucc(payload))
  );
}
