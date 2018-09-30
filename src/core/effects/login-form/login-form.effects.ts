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
import { Observable } from "rxjs";

declare let sessionStorage;

@Injectable()
export class LoginFormEffects {
  constructor(
    private actions$: Actions,
    private loginProvider: LoginProvider,
    private store: Store<AppState>
  ) {}

  @Effect()
  public loginUser$ = this.actions$
    .ofType(fromActions.SUBMIT_FORM)
    .pluck("payload")
    .map(this.checkForFields)
    .do((payload: LoginFormState | HttpErrorResponse) =>
      this.handleSideBefore(payload)
    )
    .switchMap(
      (payload: LoginFormState | HttpErrorResponse) =>
        payload instanceof HttpErrorResponse
          ? Observable.of(payload)
          : this.loginProvider.loginUser(payload.data)
    )
    .do((res: null | HttpErrorResponse) => this.handleSideAfter(res))
    .map((res: null | HttpErrorResponse) => this.handleLoginRes(res));

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
        status: -1
      });
    } else {
      return new HttpErrorResponse({
        status: -2
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
    if (!(res instanceof HttpErrorResponse)) {
      this.store.dispatch(new fromLoaderActions.Hide());
      this.updateUser();
      this.store.dispatch(new fromRouteActions.Push(new _Route("map")));
    } else {
      res.status > -1 && this.store.dispatch(new fromLoaderActions.Hide());
      switch (res.status) {
        case -2: {
          this.store.dispatch(new fromToastActions.Show("Proszę, sprawdź czy hasła są prawidłowe."));
          break;
        }
        case -1: {
          this.store.dispatch(new fromToastActions.Show("Proszę, uzupełnij wszystkie pola."));
          break;
        }
        default: {
          this.store.dispatch(new fromToastActions.Show(
            "Wprowadzone hasło jest nieprawidłowe. Proszę, spróbuj jeszcze raz."
          ));
          break;
        }
      }
    }
  }

  private updateUser(): void {
    this.store
      .select((state) => state.loginForm)
      .take(1)
      .do((res: LoginFormState) => (sessionStorage.__mail = res.data.login))
      .subscribe((data: LoginFormState) => {
        this.store.dispatch(new fromUserActions.FetchUser());
      });
  }
}
