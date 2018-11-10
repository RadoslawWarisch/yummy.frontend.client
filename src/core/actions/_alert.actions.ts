import { Action } from "@ngrx/store";

export const SHOW = '[_Alert] Show';
export const HIDE = '[_Alert] Hide';

export class Show implements Action {
  readonly type = SHOW;
  constructor(public payload: any) {};
}

export class Hide implements Action {
  readonly type = HIDE;
}

export type _AlertActions = Show | Hide;