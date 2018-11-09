
import {of as observableOf,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Rest } from "../rest/rest";
import { User } from "../../models/user";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class UserProvider {
  constructor(private rest: Rest) {}

  public fetchUser(): Observable<User> {
    return this.rest
      .getUserInfo().pipe(
      map(({ response }) => ({
        login: response.email
      }) as any),
      catchError((err: HttpErrorResponse) => observableOf(err)),);
  }
}
