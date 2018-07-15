import { Action } from "@ngrx/store";
import { _Modal } from "../models/_modal";

export const SHOW = '[_Modal] Show';
export const HIDE = '[_Modal] Hide';

export class Show implements Action {
  readonly type = SHOW;
  constructor(public payload: any) {}
}

export class Hide implements Action {
  readonly type = HIDE;
}

export type _ModalActions = Show | Hide;