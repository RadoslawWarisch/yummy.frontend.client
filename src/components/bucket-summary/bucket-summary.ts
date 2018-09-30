import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';
import * as fromBucketActions from "../../core/actions/bucket.actions";

@Component({
  selector: 'bucket-summary',
  templateUrl: 'bucket-summary.html'
})
export class BucketSummaryComponent {

  @Input()
  public count: number;
  @Input()
  public price: number;

  constructor(
    private store: Store<AppState>
  ) {}

  public submit(): void {
    this.store.dispatch(
      new fromBucketActions.SubmitBucket()
    );
  }

}
