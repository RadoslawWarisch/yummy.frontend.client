import { of as observableOf, Observable } from "rxjs";

import { take, pluck, map, tap, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { HttpErrorResponse } from "@angular/common/http";

import * as fromActions from "../../actions/login-form.actions";
import * as fromUserActions from "../../actions/user.actions";
import * as fromLoaderActions from "../../actions/_loader.actions";
import * as fromToastActions from "../../actions/_toast.actions";
import * as fromRouteActions from "../../actions/_route.actions";
import { LoginFormState } from "../../reducers/login-form/login-form.reducer";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { _Route } from "../../models/_route";
import { LoginProvider } from "../../providers/login-provider/login-provider";

declare let sessionStorage;

@Injectable()
export class LoginFormEffects {
  constructor(
    private actions$: Actions,
    private loginProvider: LoginProvider,
    private store: Store<AppState>
  ) {}

  @Effect()
  public loginUser$ = this.actions$.ofType(fromActions.SUBMIT_FORM).pipe(
    pluck("payload"),
    map(this.checkForFields),
    tap((payload: LoginFormState | HttpErrorResponse) =>
      this.handleSideBefore(payload)
    ),
    switchMap((payload: LoginFormState | HttpErrorResponse) =>
      payload instanceof HttpErrorResponse
        ? observableOf(payload)
        : this.loginProvider.loginUser(payload.data)
    ),
    tap((res: null | HttpErrorResponse) => this.handleSideAfter(res)),
    map((res: null | HttpErrorResponse) => this.handleLoginRes(res))
  );

  private checkForFields(
    payload: LoginFormState
  ): LoginFormState | HttpErrorResponse {
    let {
      data: { login, password, isSign, passwordConfirm }
    } = payload;
    if (
      (login && password && !isSign) ||
      (login &&
        password &&
        isSign &&
        passwordConfirm &&
        password === passwordConfirm)
    ) {
      return payload;
    } else if (
      (!isSign && (!login || !password)) ||
      (isSign && (!login || !password || !passwordConfirm))
    ) {
      return new HttpErrorResponse({
        status: -11
      });
    } else {
      return new HttpErrorResponse({
        status: -22
      });
    }
  }

  private handleLoginRes(
    res: null | HttpErrorResponse
  ): fromActions.LoginFormActions {
    return res instanceof HttpErrorResponse
      ? new fromActions.SubmitFormFail()
      : new fromActions.SubmitFormSucc();
  }

  private handleSideBefore(res: LoginFormState | HttpErrorResponse): void {
    !(res instanceof HttpErrorResponse) &&
      this.store.dispatch(new fromLoaderActions.Show("Logowanie..."));
  }

  private handleSideAfter(res: null | HttpErrorResponse): void {
    console.log(res);
    this.store.dispatch(new fromLoaderActions.Hide());
    if (!(res instanceof HttpErrorResponse)) {
      this.updateUser();
      this.store.dispatch(new fromRouteActions.Push(new _Route("map")));
    } else {
      switch (res.status) {
        case -22: {
          this.store.dispatch(
            new fromToastActions.Show(
              "Proszę, sprawdź czy hasła są prawidłowe."
            )
          );
          break;
        }
        case -11: {
          this.store.dispatch(
            new fromToastActions.Show("Proszę, uzupełnij wszystkie pola.")
          );
          break;
        }
        default: {
          this.store.dispatch(
            new fromToastActions.Show(
              "Brak połączenia z internetem. Proszę, sprawdź połączenie i spróbuj jeszcze raz."
            )
          );
          break;
        }
      }
    }
  }

  private updateUser(): void {
    this.store
      .select((state) => state.loginForm)
      .pipe(
        take(1),
        tap((res: LoginFormState) => (sessionStorage.__mail = res.data.login))
      )
      .subscribe((data: LoginFormState) => {
        this.store.dispatch(new fromUserActions.FetchUser());
      });
  }
}
