import { Action } from "@ngrx/store";

export const FETCH_USER = "[User] Fetch User";
export const FETCH_USER_SUCC = "[User] Fetch User Succ";
export const FETCH_USER_FAIL = "[User] Fetch User Fail";

export const UPDATE_USER = "[User] Update User";

export const SUBMIT_USER = "[User] Submit User";
export const SUBMIT_USER_SUCC = "[User] Submit User Succ";
export const SUBMIT_USER_FAIL = "[User] Submit User Fail";

export class FetchUser implements Action {
  readonly type = FETCH_USER;
}

export class FetchUserSucc implements Action {
  readonly type = FETCH_USER_SUCC;
  constructor(public payload: any) {}
}

export class FetchUserFail implements Action {
  readonly type = FETCH_USER_FAIL;
}

export class SubmitUser implements Action {
  readonly type = SUBMIT_USER;
  constructor(public payload: any) {}
}

export class SubmitUserSucc implements Action {
  readonly type = SUBMIT_USER_SUCC;
}

export class SubmitUserFail implements Action {
  readonly type = SUBMIT_USER_FAIL;
}

export type UserActions =
  | FetchUser
  | FetchUserSucc
  | FetchUserFail
  | SubmitUser
  | SubmitUserSucc
  | SubmitUserFail;
