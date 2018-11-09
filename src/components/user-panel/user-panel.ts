import { Component } from '@angular/core';
import { User } from '../../core/models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';
import { Observable } from 'rxjs';
import { _Route } from '../../core/models/_route';
import * as fromRouteActions from '../../core/actions/_route.actions';
import { AppConfig } from '../../app/app.config';

@Component({
  selector: 'user-panel',
  templateUrl: 'user-panel.html'
})
export class UserPanelComponent {

  public user$: Observable<User>;
  public config: any = AppConfig;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$ = this.store.select((state) => state.user.data);
  }

  public navigate(page: string): void {
    this.store.dispatch(new fromRouteActions.Push(new _Route(page)));
  }

}
