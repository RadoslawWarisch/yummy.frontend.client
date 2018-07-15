import { Action } from "@ngrx/Store";

export const UPDATE_BUCKET = "[Offer] Update Bucket";
export const UPDATE_BUCKET_SUCC = "[Offer] Update Bucket Succ";
export const UPDATE_BUCKET_FAIL = "[Offer] Update Bucket Fail";

export const FETCH_BUCKET = "[Offer] Fetch Bucket";
export const FETCH_BUCKET_SUCC = "[Offer] Fetch Bucket Succ";
export const FETCH_BUCKET_FAIL = "[Offer] Fetch Bucket Fail";

export class UpdateBucket implements Action {
  readonly type = UPDATE_BUCKET;
  constructor(public payload: any) {}
}
export class UpdateBucketSucc implements Action {
  readonly type = UPDATE_BUCKET_SUCC;
  constructor(public payload: any) {}
}
export class UpdateBucketFail implements Action {
  readonly type = UPDATE_BUCKET_FAIL;
}

export class FetchBucket implements Action {
  readonly type = FETCH_BUCKET;
  constructor(public payload: any) {}
}
export class FetchBucketSucc implements Action {
  readonly type = FETCH_BUCKET_SUCC;
  constructor(public payload: any) {}
}
export class FetchBucketFail implements Action {
  readonly type = FETCH_BUCKET_FAIL;
}

export type BucketActions =
  | UpdateBucket
  | UpdateBucketSucc
  | UpdateBucketFail
  | FetchBucket
  | FetchBucketSucc
  | FetchBucketFail;
