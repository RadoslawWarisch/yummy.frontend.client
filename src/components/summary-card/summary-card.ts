import { Component, Input } from '@angular/core';
import { Place } from '../../core/models/place';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';
import * as fromRouteActions from "../../core/actions/_route.actions";
import { _Route } from '../../core/models/_route';

@Component({
  selector: 'summary-card',
  templateUrl: 'summary-card.html'
})
export class SummaryCardComponent {

  @Input() public paymentCode: string;
  @Input() public price: number;
  @Input() public restaurant: Place;

  constructor(
    private store: Store<AppState>
  ) {}

  public trackRestaurant(): void {
    console.log('track restaurant');
  }

}
