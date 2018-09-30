import { Component, Input } from '@angular/core';
import { Transaction } from '../../core/models/transaction';

@Component({
  selector: 'transaction-item',
  templateUrl: 'transaction-item.html'
})
export class TransactionItemComponent {

  @Input()
  public transaction: Transaction;

  constructor() {}

}
