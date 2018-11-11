import { Component, Input } from '@angular/core';
import { Offer } from '../../core/models/offer';

@Component({
  selector: 'compact-offer-item',
  templateUrl: 'compact-offer-item.html'
})
export class CompactOfferItemComponent {

  @Input()
  public offer: Offer;

  constructor() {}

}
