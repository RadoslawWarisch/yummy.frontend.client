import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';
import * as fromModalAction from '../../core/actions/_modal.actions';
import { _ModalType } from '../../core/models/_modal';

@IonicPage({
  name: 'welcome'
})
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(
    private store: Store<AppState>
  ) { }

  public signUp(): void {
    this.store.dispatch(new fromModalAction.Show({
      mode: _ModalType.SIGN_UP,
      meta: {
        id: null
      }
    }));
  }

}
