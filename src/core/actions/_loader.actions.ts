import { Action } from "@ngrx/store";

export const SHOW = '[_Loader] Show';
export const HIDE = '[_Loader] Hide';

export class Show implements Action {
  readonly type = SHOW;
  constructor(public payload: string) {};
}

export class Hide implements Action {
  readonly type = HIDE;
}

export type _LoaderActions = Show | Hide;