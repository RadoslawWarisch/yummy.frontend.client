import { of as observableOf, Observable } from "rxjs";

import { mergeMap, tap, catchError } from "rxjs/operators";
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
      : this.rest.loginUser(this.parseForm(loginForm))
    ).pipe(
      mergeMap((data) =>
        loginForm.isSign ? observableOf(null) : this.saveAuth(data)
      ),
      mergeMap(() => this.saveEmail(loginForm as any)),
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
