import { Component, Output, EventEmitter } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubmitForm } from "../../core/actions/login-form.actions";
import { AppState } from "../../core/app-state";
import { Store } from "@ngrx/store";
import { LoginForm } from "../../core/models/login-form";
import { Observable } from "rxjs";

@Component({
  selector: "login-form",
  templateUrl: "login-form.html"
})
export class LoginFormComponent {
  @Output() public signUpEmitter: EventEmitter<void>;
  public form: FormGroup;
  public form$: Observable<LoginForm | any>;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.signUpEmitter = new EventEmitter<void>();
    this.initForm();
  }

  ngOnInit(): void {
    this.store.select((state) => state.loginForm.data);
  }

  public initForm(): void {
    this.form$ = this.store.select((state) => state.loginForm.data);
    this.form = this.formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  public submit(): void {
    this.store.dispatch(new SubmitForm({ data: this.form.value }));
  }
}
