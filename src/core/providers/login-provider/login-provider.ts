
import {of as observableOf,  Observable } from 'rxjs';

import {mergeMap, tap, catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Rest } from "../rest/rest";
import { Settings } from "../settings/settings";
import { LoginForm } from "../../models/login-form";
import { LoginUserBody } from "../rest/rest";
import { HttpErrorResponse } from "@angular/common/http";

declare let sessionStorage;

@Injectable()
export class LoginProvider {
  constructor(private rest: Rest, private settings: Settings) {}

  loginUser(loginForm: LoginForm): Observable<string | HttpErrorResponse> {
    return (loginForm.isSign
      ? this.rest.createUser(this.parseForm(loginForm))
      : this.rest.loginUser(this.parseForm(loginForm))
    ).pipe(
      mergeMap(
        (data) => (loginForm.isSign ? observableOf(null) : this.saveAuth(data))
      ),
      catchError((err) => observableOf(err)),);
  }

  saveAuth({ Authorization }): Observable<void> {
    return observableOf(null).pipe(tap(() => (sessionStorage.__th = Authorization)));
  }

  parseForm(loginForm: LoginForm): LoginUserBody {
    return {
      email: loginForm.login,
      password: loginForm.password
    };
  }
}
