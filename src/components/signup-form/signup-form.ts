import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';

@Component({
  selector: 'signup-form',
  templateUrl: 'signup-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent {
  private form: FormGroup;
  private form$: any;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.observeChanges();
    this.store.select((state) => state.loginForm.data);
  }

  initForm(): void {
    this.form$ = this.store.select((state) => state.loginForm.data);
    this.form = this.formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  observeChanges(): void {
    this.form.valueChanges.subscribe((state) => {
      this.dispatchChanges(state);
    });
  }

  dispatchChanges(state: any): void {
    //this.store.dispatch(new UpdateForm({ data: state }));
  }

  submit(): void {
    //this.store.dispatch(new SubmitForm({ data: this.form.value }));
  }

}
