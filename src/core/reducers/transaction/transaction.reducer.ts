import { ActionReducer, Action } from "@ngrx/store";
import { Transaction } from "../../models/transaction";
import * as fromAction from "../../actions/transaction.actions";

export interface TransactionState {
  data: Transaction[];
  isFetching?: boolean;
}

const initialState: TransactionState = {
  data: [],
  isFetching: false
};

export function transactionReducer (
  state: TransactionState = initialState,
  action: Action | any
) {
  switch (action.type) {
    case fromAction.FETCH_TRANSACTIONS:
      return ({
        ...state,
        isFetching: true
      });
    case fromAction.FETCH_TRANSACTIONS_SUCC:
      return {
        ...state,
        data: action.payload,
        isFetching: false
      };
    case fromAction.FETCH_TRANSACTIONS_FAIL:
      return {
        ...state,
        isFetching: false
      };
    case fromAction.EXPAND_TRANSACTION:
      return {
        ...state,
        data: state.data.map((transaction: Transaction) => ({
          ...transaction,
          isExpanded: transaction.id === action.payload
        }))
      }
    default:
      return state;
  }
};
