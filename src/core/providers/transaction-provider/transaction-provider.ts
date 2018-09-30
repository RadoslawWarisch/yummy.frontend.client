import { Injectable } from "@angular/core";
import { Rest } from "../rest/rest";
import { Observable } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class TransactionsProvider {
  
  constructor(private rest: Rest) {}

  getTransactions(): Observable<any> {
    return this.rest
      .getTransactions()
      .catch((err: HttpErrorResponse) => Observable.of(err));
  }

}