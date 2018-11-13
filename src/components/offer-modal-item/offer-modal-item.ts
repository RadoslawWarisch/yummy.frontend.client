import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Offer } from '../../core/models/offer';

@Component({
  selector: 'offer-modal-item',
  templateUrl: 'offer-modal-item.html'
})
export class OfferModalItemComponent {
  @Input()
  public offer: Offer;
  @Input()
  public isBucket?: boolean;
  @Output()
  public addEmitter: EventEmitter<Offer>;
  @Output()
  public removeEmitter: EventEmitter<string>;

  constructor() {
    this.addEmitter = new EventEmitter<Offer>();
    this.removeEmitter = new EventEmitter<string>();
  }

}
