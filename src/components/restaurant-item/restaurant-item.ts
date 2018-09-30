import { Component, Input } from '@angular/core';
import { Place } from '../../core/models/place';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';
import * as fromRouteAction from '../../core/actions/_route.actions';

@Component({
  selector: 'restaurant-item',
  templateUrl: 'restaurant-item.html'
})
export class RestaurantItemComponent {

  @Input() 
  public restaurant: Place;
  @Input()
  public isBadge?: boolean;

  constructor(
    private store: Store<AppState>
  ) {}

  public displayOnMap(): void {
    this.store.dispatch(new fromRouteAction.Root({
      name: 'map',
      params: {
        restaurantId: this.restaurant.id,
        restaurantLat: this.restaurant.lat,
        restaurantLng: this.restaurant.lng
      }
    }))
  }

  public goToPlace(): void {
    if (this.isBadge) return;
    this.store.dispatch(new fromRouteAction.Push({
      name: "place",
      params: {
        place: this.restaurant
      }
    }));
  }

}
