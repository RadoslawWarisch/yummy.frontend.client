
import {map, switchMap} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import * as fromActions from "../../actions/user.actions";
import { UserState } from "../../reducers/user/user.reducer";
import { UserProvider } from "../../providers/user-provider/user-provider";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "../../models/user";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userProvider: UserProvider
  ) {}

  @Effect()
  public fetchUser$ = this.actions$
    .ofType(fromActions.FETCH_USER).pipe(
    switchMap(() => this.userProvider.fetchUser()),
    map(
      (res: User | HttpErrorResponse) =>
        res instanceof HttpErrorResponse
          ? new fromActions.FetchUserFail()
          : new fromActions.FetchUserSucc(res)
    ),);

  // @Effect()
  // submitUser$ = this.actions$
  //   .ofType(fromActions.SUBMIT_USER)
  //   .pluck('payload')
  //   .switchMap((payload: UserState) => )
}
