import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user';
import * as fromActions from '../../core/actions/user.actions';
import * as fromRouteActions from '../../core/actions/_route.actions';

@IonicPage({
  name: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public user$: Observable<User>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$ = this.store.select((state) => state.user.data);
  }

  public detectChanges(key: string, { _value: value }: { _value: string }): void {
    
  }

  public submit(): void {
    
  }

  public close(): void {
    this.store.dispatch(new fromRouteActions.Pop());
  }

}
