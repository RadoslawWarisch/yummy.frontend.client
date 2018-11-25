import { of as observableOf, Observable } from "rxjs";

import { tap, catchError, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Rest } from "../rest/rest";
import { LoginForm } from "../../models/login-form";
import { LoginUserBody } from "../rest/rest";
import { HttpErrorResponse } from "@angular/common/http";

declare let localStorage;

@Injectable()
export class LoginProvider {
  constructor(private rest: Rest) {}

  loginUser(loginForm: LoginForm): Observable<string | HttpErrorResponse> {
    return (loginForm.isSign
      ? this.rest.createUser(this.parseForm(loginForm))
      : observableOf(null)
    ).pipe(
      switchMap(() => this.rest.loginUser(this.parseForm(loginForm))),
      switchMap((data) => this.saveAuth(data)),
      switchMap(() => this.saveEmail(loginForm as any)),
      catchError((err) => observableOf(err))
    );
  }

  saveAuth({ Authorization }): Observable<void> {
    return observableOf(null).pipe(
      tap(() => (localStorage.__th = Authorization))
    );
  }

  saveEmail({ login }): Observable<void> {
    return observableOf(null).pipe(tap(() => (localStorage.__mail = login)));
  }

  parseForm(loginForm: LoginForm): LoginUserBody {
    return {
      email: loginForm.login,
      password: loginForm.password
    };
  }
}
