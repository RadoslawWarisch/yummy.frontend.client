import { Component, Input } from '@angular/core';

export enum ListModeIcon {
  MAP = "MAP",
  PLACES = "PLACES",
  OFFERS = "OFFERS",
  CART = "CART",
  MENU = "MENU",
  BACK = "BACK"
}

@Component({
  selector: 'list-mode-icon',
  templateUrl: 'list-mode-icon.html'
})
export class ListModeIconComponent {

  @Input() 
  public mode: ListModeIcon = ListModeIcon.MAP;

  constructor() {}

}
