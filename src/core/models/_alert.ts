export class _Alert {
  public isShown?: boolean = false;
  public title: string = "Yummy";
  public message: string = "Label";
  public buttons?: string[] = [ "OK" ];
  public callbacks?: ((value: any) => boolean | void)[] = [ null ];

  constructor(alert?: _Alert) {
    Object.assign(this, alert);
  }
  
}

export interface _Alert {
  
}