export class _Toast {

  public isShown: boolean;
  public label: string;

  constructor(
    isShown: boolean = false,
    label: string = ''
  ) {
    this.isShown = isShown;
    this.label = label;
  }
  
}