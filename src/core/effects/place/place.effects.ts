import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import * as fromActions from "../../actions/place.actions";
import { GetPlacesBody } from "../../providers/rest/rest";
import { PlaceProvider } from "../../providers/place/place-provider";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class PlaceEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private placeProvider: PlaceProvider
  ) {}

  @Effect()
  public fetchPlaces$ = this.actions$
    .ofType(fromActions.FETCH_PLACES)
    .pluck("payload")
    .switchMap((payload: GetPlacesBody) => this.placeProvider.fetchPlaces(payload))
    .map((res: any | HttpErrorResponse) => {
      return (!(res instanceof HttpErrorResponse) && res)
        ? new fromActions.FetchPlacesSucc(res)
        : new fromActions.FetchPlacesFail();
    });
}