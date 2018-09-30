import { ActionReducer, Action } from "@ngrx/store";
import { Bucket } from "../../models/Bucket";
import * as fromAction from "../../actions/bucket.actions";
import { Offer } from "../../models/offer";

export interface BucketState extends Bucket {};

const initialState: BucketState = new Bucket({
  offers: [],
  count: 0,
  price: 0
})


export const bucketReducer: ActionReducer<BucketState> = (
  state: BucketState = initialState,
  action: Action | any
) => {
  switch (action.type) {
    case fromAction.UPDATE_BUCKET:
      return {
        ...state,
        ...action.payload
      }
    case fromAction.SUBMIT_BUCKET_SUCC:
      return initialState;
    default:
      return state;
  }
};
