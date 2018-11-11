import { Component, Input } from '@angular/core';
import { Transaction } from '../../core/models/transaction';
import * as fromActions from "../../core/actions/transaction.actions";
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';

@Component({
  selector: 'transaction-item',
  templateUrl: 'transaction-item.html'
})
export class TransactionItemComponent {

  @Input()
  public transaction: Transaction;

  constructor(private store: Store<AppState>) {}

  public expand(): void {
    this.store.dispatch(
      new fromActions.ExpandTransaction(this.transaction.id)
    );
  }

}
