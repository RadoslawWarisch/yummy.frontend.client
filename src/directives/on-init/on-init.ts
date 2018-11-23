import { Directive, Output, EventEmitter } from "@angular/core";

@Directive({
  selector: "[on-init]"
})

export class OnInitDirective {
  @Output("on-init") 
  public onInit: EventEmitter<any> = new EventEmitter();
  
  ngOnInit() {
    this.onInit.emit(0);
  }
}
