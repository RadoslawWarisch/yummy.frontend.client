import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Offer } from '../../core/models/offer';

@Component({
  selector: 'expandable-offer-item',
  templateUrl: 'expandable-offer-item.html'
})
export class ExpandableOfferItemComponent {

  @Input()
  public offer: Offer;
  @Output()
  public expandEmitter: EventEmitter<void>;

  constructor() {
    this.expandEmitter = new EventEmitter<void>();
  }

}
