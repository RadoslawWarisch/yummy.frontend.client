
import {pluck} from 'rxjs/operators';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Place } from '../../core/models/place';
import { Observable } from 'rxjs';
import { Offer } from '../../core/models/offer';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';
import * as fromOfferActions from '../../core/actions/offer.actions';

@IonicPage({
  name: 'place'
})
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  public place: Place;
  public offers$: Observable<Offer[]>;
  public isLoading$: Observable<boolean>;

  constructor(
    private navParams: NavParams,
    private store: Store<AppState>
  ) {
    this.offers$ = this.store.select('offer').pipe(pluck('data'));
    this.isLoading$ = this.store.select('offer').pipe(pluck('isFetching'));
  }

  ionViewWillEnter() {
    this.place = this.navParams.get('place');
    if (this.place) {
      this.store.dispatch(new fromOfferActions.FetchOffers({
        restaurantId: this.place.id
      }));
    }
  }

  public pullDown(): void {
    console.log('pull up')
  }

}
