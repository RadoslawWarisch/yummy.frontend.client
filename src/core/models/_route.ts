import { NavOptions } from "ionic-angular";

export class _Route {

  public name: string;
  public params: NavOptions;

  constructor(
    name: string = 'welcome',
    params: NavOptions = {}
  ) {
    this.name = name;
    this.params = params;
  }
}