import { Component, Input } from '@angular/core';

@Component({
  selector: 'offer-modal-button',
  templateUrl: 'offer-modal-button.html'
})
export class OfferModalButtonComponent {

  @Input()
  public image: string;
  @Input()
  public float: 'right' | 'left';

  constructor() {}

}
