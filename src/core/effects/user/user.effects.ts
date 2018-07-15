import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import * as fromActions from '../../actions/user.actions';
import { UserState } from "../../reducers/user/user.reducer";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  // @Effect()
  // submitUser$ = this.actions$
  //   .ofType(fromActions.SUBMIT_USER)
  //   .pluck('payload')
  //   .switchMap((payload: UserState) => )
}