import { Component } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChangeDetectionStrategy } from "@angular/core";
import { UpdateForm, SubmitForm } from "../../core/actions/login-form.actions";
import { AppState } from "../../core/app-state";
import { Store } from "@ngrx/store";
import { LoginForm } from "../../core/models/login-form";

@Component({
  selector: "login-form",
  templateUrl: "login-form.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  form: FormGroup;
  form$: LoginForm | any;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

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

  dispatchChanges(state: LoginForm): void {
    this.store.dispatch(new UpdateForm({ data: state }));
  }

  submit(): void {
    this.store.dispatch(new SubmitForm({ data: this.form.value }));
  }
}
