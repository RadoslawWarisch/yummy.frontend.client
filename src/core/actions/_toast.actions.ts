import { Action } from "@ngrx/store";

export const SHOW = '[_Toast] Show';
export const HIDE = '[_Toast] Hide';

export class Show implements Action {
  readonly type = SHOW;
  constructor(public payload: string) {};
}

export class Hide implements Action {
  readonly type = HIDE;
}

export type _ToastActions = Show | Hide;