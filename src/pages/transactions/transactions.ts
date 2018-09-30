import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';
import * as fromRouteActions from '../../core/actions/_route.actions';
import * as fromTransactionActions from '../../core/actions/transaction.actions';
import { Observable } from 'rxjs';
import { Transaction } from '../../core/models/transaction';

@IonicPage({
  name: 'transactions'
})
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  public transactions$: Observable<Transaction[]>;
  public isLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) {
    this.subscribeTransactions();
    this.fetchTransactions();
  }

  private subscribeTransactions(): void {
    this.transactions$ = this.store.select("transaction").pluck("data");
    this.isLoading$ = this.store.select("transaction").pluck("isFetching");
  }

  private fetchTransactions(): void {
    this.transactions$.take(1).subscribe((data: Transaction[]) => {
      if (data.length === 0) {
        this.store.dispatch(
          new fromTransactionActions.FetchTransactions({})
        )
      }
    })
  }

  public pullDown(): void {
    console.log('pull up')
  }

  public close(): void {
    this.store.dispatch(new fromRouteActions.Pop());
  }

}