import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AppState } from '../../core/app-state';
import { Place } from '../../core/models/place';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@IonicPage({
  name: "code"
})
@Component({
  selector: 'page-code',
  templateUrl: 'code.html',
})
export class CodePage {
  public paymentCode: string;
  public price: number;
  public restaurant$: Observable<Place>;

  constructor(
    private navParams: NavParams,
    private store: Store<AppState>
  ) {}

  ionViewWillLoad() {
    const restaurantId: string | number = this.navParams.get('restaurantId');
    this.paymentCode = this.navParams.get('paymentCode');
    this.price = this.navParams.get('price');
    this.restaurant$ = this.store.select('place')
      .pluck("data")
      .map((places: Place[]) => places.find((place: Place) => place.id === restaurantId));
  }

}
