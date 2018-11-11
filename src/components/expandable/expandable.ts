import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  Renderer
} from "@angular/core";

@Component({
  selector: "expandable-cmp",
  templateUrl: "expandable.html"
})
export class ExpandableComponent {
  @ViewChild("expandWrapper", { read: ElementRef }) 
  public expandWrapper: ElementRef;
  @Input("expanded") 
  public expanded: boolean;
  @Input("expandHeight") 
  public expandHeight: number;

  constructor(public renderer: Renderer) {}

  ngAfterViewInit() {
    this.renderer.setElementStyle(
      this.expandWrapper.nativeElement,
      "height",
      this.expandHeight + "px"
    );
  }
}
