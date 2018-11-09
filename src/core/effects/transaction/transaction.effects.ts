
import {map, switchMap} from 'rxjs/operators';
import { Actions, Effect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as fromActions from "../../actions/transaction.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { TransactionsProvider } from "../../providers/transaction-provider/transaction-provider";

@Injectable()
export class TransactionEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private transactionProvider: TransactionsProvider
  ) {}

  @Effect()
  public getPendings$ = this.actions$
    .ofType(fromActions.FETCH_TRANSACTIONS).pipe(
    switchMap(() => this.transactionProvider.getTransactions()),
    map((res: any | HttpErrorResponse) => {
      return (!(res instanceof HttpErrorResponse) && res.currentOrderList)
        ? new fromActions.FetchTransactionsSucc(res.currentOrderList)
        : new fromActions.FetchTransactionsFail();
    }),);

}