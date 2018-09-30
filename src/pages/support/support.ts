import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';
import * as fromRouteActions from '../../core/actions/_route.actions';

@IonicPage({
  name: 'support'
})
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  constructor(
    private store: Store<AppState>
  ) {}

  public close(): void {
    this.store.dispatch(new fromRouteActions.Pop());
  }

}
