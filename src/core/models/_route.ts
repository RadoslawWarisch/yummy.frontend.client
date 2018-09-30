export class _Route {

  public name: string;
  public params?: any;

  constructor(
    name: string = "initial",
    params: any = {}
  ) {
    this.name = name;
    this.params = params;
  }
}