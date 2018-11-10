import { Action } from "@ngrx/Store";
import { Offer } from "../models/offer";

export const ADD_TO_BUCKET = "[Bucket] Add To Bucket";
export const REMOVE_FROM_BUCKET = "[Bucket] Remove From Bucket";
export const CANCEL_UPDATE_BUCKET = "[Bucket] Cancel Update Bucket";
export const UPDATE_BUCKET = "[Bucket] Update Bucket";
export const SUBMIT_BUCKET = "[Bucket] Submit Bucket";
export const SUBMIT_BUCKET_SUCC = "[Bucket] Submit Bucket Succ";
export const SUBMIT_BUCKET_FAIL = "[Bucket] Submit Bucket Fail";

export class AddToBucket implements Action {
  readonly type = ADD_TO_BUCKET;
  constructor(public payload: Offer) {}
}

export class RemoveFromBucket implements Action {
  readonly type = REMOVE_FROM_BUCKET;
  constructor(public payload: string | number) {}
}

export class UpdateBucket implements Action {
  readonly type = UPDATE_BUCKET;
  constructor(public payload: any) {}
}

export class CanceledUpdateBucket implements Action {
  readonly type = CANCEL_UPDATE_BUCKET;
}

export class SubmitBucket implements Action {
  readonly type = SUBMIT_BUCKET;
}

export class SubmitBucketSucc implements Action {
  readonly type = SUBMIT_BUCKET_SUCC;
}

export class SubmitBucketFail implements Action {
  readonly type = SUBMIT_BUCKET_FAIL;
}

export type BucketActions =
  | UpdateBucket
  | AddToBucket
  | RemoveFromBucket
  | SubmitBucket
  | SubmitBucketFail
  | SubmitBucketSucc;
