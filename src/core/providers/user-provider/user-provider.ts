import { Injectable } from "@angular/core";
import { Rest } from "../rest/rest";
import { User } from "../../models/user";
import { Observable } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class UserProvider {
  constructor(private rest: Rest) {}

  public fetchUser(): Observable<User> {
    return this.rest
      .getUserInfo()
      .map((res: any) => ({
        login: res.email
      }) as any)
      .catch((err: HttpErrorResponse) => Observable.of(err));
  }
}
