import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Offer } from '../../core/models/offer';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';
import * as fromBucketActions from '../../core/actions/bucket.actions';

@Component({
  selector: 'offer-item',
  templateUrl: 'offer-item.html'
})
export class OfferItemComponent {
  @Input()
  public offer: Offer;
  @Input()
  public isBucket?: boolean;
  @Output()
  public showEmitter: EventEmitter<void>;

  constructor(
    public store: Store<AppState>
  ) {
    this.showEmitter = new EventEmitter<void>();
  }

  public addToBucket(): void {
    this.store.dispatch(
      new fromBucketActions.AddToBucket(this.offer)
    );
  }

  public removeFromBucket(): void {
    this.store.dispatch(
      new fromBucketActions.RemoveFromBucket(this.offer.id)
    );
  }

}
