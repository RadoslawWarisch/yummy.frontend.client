import { Action } from "@ngrx/store";
import { LoginForm } from "../models/login-form";
import { LoginFormState } from "../reducers/login-form/login-form.reducer";

export const UPDATE_FORM = "[LoginForm] Update Form";
export const SUBMIT_FORM = "[LoginForm] Submit Form";
export const SUBMIT_FORM_SUCC = "[LoginForm] Submit Form Succ";
export const SUBMIT_FORM_FAIL = "[LoginForm] Submit Form Fail";

export class UpdateForm implements Action {
  readonly type = UPDATE_FORM;
  constructor(public payload: any) {}
}

export class SubmitForm implements Action {
  readonly type = SUBMIT_FORM;
  constructor(public payload: LoginFormState) {}
}

export class SubmitFormSucc implements Action {
  readonly type = SUBMIT_FORM_SUCC;
}

export class SubmitFormFail implements Action {
  readonly type = SUBMIT_FORM_FAIL;
}

export type LoginFormActions =
  | UpdateForm
  | SubmitForm
  | SubmitFormSucc
  | SubmitFormFail;
