import { Component } from '@angular/core';

/**
 * Generated class for the ExpandableOfferItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'expandable-offer-item',
  templateUrl: 'expandable-offer-item.html'
})
export class ExpandableOfferItemComponent {

  text: string;

  constructor() {
    console.log('Hello ExpandableOfferItemComponent Component');
    this.text = 'Hello World';
  }

}
