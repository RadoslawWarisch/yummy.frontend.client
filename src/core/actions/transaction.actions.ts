import { Action } from "@ngrx/store";

export const FETCH_TRANSACTIONS = "[Transaction] Fetch Transactions";
export const FETCH_TRANSACTIONS_SUCC = "[Transaction] Fetch Transactions Succ";
export const FETCH_TRANSACTIONS_FAIL = "[Transaction] Fetch Transactions Fail";
export const EXPAND_TRANSACTION = "[Transaction] Expand Transaction";

export class FetchTransactions implements Action {
  readonly type = FETCH_TRANSACTIONS;
  constructor(public payload: any) {}
}

export class FetchTransactionsSucc implements Action {
  readonly type = FETCH_TRANSACTIONS_SUCC;
  constructor(public payload: any) {}
}

export class FetchTransactionsFail implements Action {
  readonly type = FETCH_TRANSACTIONS_FAIL;
}

export class ExpandTransaction implements Action {
  readonly type = EXPAND_TRANSACTION;
  constructor(public payload: string) {}
}

export type TransactionActions =
  | FetchTransactions
  | FetchTransactionsSucc
  | FetchTransactionsFail
  | ExpandTransaction;