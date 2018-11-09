
import {of as observableOf,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Rest } from "../rest/rest";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class TransactionsProvider {
  
  constructor(private rest: Rest) {}

  getTransactions(): Observable<any> {
    return this.rest
      .getTransactions().pipe(
      catchError((err: HttpErrorResponse) => observableOf(err)));
  }

}