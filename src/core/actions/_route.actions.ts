import { Action } from "@ngrx/store";
import { _Route } from "../models/_route";

export const ROOT = '[_Route] Root';
export const PUSH = '[_Route] Push';
export const POP = '[_Route] Pop';

export class Root implements Action {
  readonly type = ROOT;
  constructor(public payload: _Route) {};
}

export class Push implements Action {
  readonly type = PUSH;
  constructor(public payload: _Route) {};
}

export class Pop implements Action {
  readonly type = POP;
}

export type _RouteActions = Root | Push | Pop;