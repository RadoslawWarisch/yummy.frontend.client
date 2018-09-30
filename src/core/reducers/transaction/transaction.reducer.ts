import { ActionReducer, Action } from "@ngrx/store";
import { Transaction } from "../../models/transaction";
import * as fromAction from "../../actions/transaction.actions";

export interface TransactionState {
  data: Transaction[];
  isFetching?: boolean;
}

//TODO remove mockup
const initialState: TransactionState = {
  data: [],
  isFetching: false
};

export const transactionReducer: ActionReducer<TransactionState> = (
  state: TransactionState = initialState,
  action: Action | any
) => {
  switch (action.type) {
    case fromAction.FETCH_TRANSACTIONS:
      return {
        ...state,
        isFetching: true
      };
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
    default:
      return state;
  }
};
