import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user';
import * as fromActions from '../../core/actions/user.actions';
import * as fromRouteActions from '../../core/actions/_route.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage({
  name: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public user$: Observable<User>;
  public form: FormGroup

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.user$ = this.store.select((state) => state.user.data);
    this.form = this.formBuilder.group({
      phone: ["", Validators.required]
    });
  }

  public submit(): void {
    this.store.dispatch(new fromActions.SubmitUser({ data: this.form.value }));
  }

  public close(): void {
    this.store.dispatch(new fromRouteActions.Pop());
  }

}
