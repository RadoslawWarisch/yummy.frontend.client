import { Injectable } from "@angular/core";
import { Rest } from "../rest/rest";
import { Settings } from "../settings/settings";
import { LoginForm } from "../../models/login-form";

import { Observable } from "rxjs";
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
    )
      .mergeMap(
        (data) => (loginForm.isSign ? Observable.of(null) : this.saveAuth(data))
      )
      .catch((err) => Observable.of(err));
  }

  saveAuth({ Authorization }): Observable<void> {
    return Observable.of(null).do(() => (sessionStorage.__th = Authorization));
  }

  parseForm(loginForm: LoginForm): LoginUserBody {
    return {
      email: loginForm.login,
      password: loginForm.password
    };
  }
}
