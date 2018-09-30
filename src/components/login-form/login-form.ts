import { Component, Output, EventEmitter } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UpdateForm, SubmitForm } from "../../core/actions/login-form.actions";
import { AppState } from "../../core/app-state";
import { Store } from "@ngrx/store";
import { LoginForm } from "../../core/models/login-form";

@Component({
  selector: "login-form",
  templateUrl: "login-form.html"
})
export class LoginFormComponent {
  @Output() public signUpEmitter: EventEmitter<void>;
  form: FormGroup;
  form$: LoginForm | any;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.signUpEmitter = new EventEmitter<void>();
    this.initForm();
  }

  ngOnInit(): void {
    //this.observeChanges();
    this.store.select((state) => state.loginForm.data);
  }

  initForm(): void {
    this.form$ = this.store.select((state) => state.loginForm.data);
    this.form = this.formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  // observeChanges(): void {
  //   this.form.valueChanges.subscribe((state) => {
  //     this.dispatchChanges(state);
  //   });
  // }

  // dispatchChanges(state: LoginForm): void {
  //   this.store.dispatch(new UpdateForm({ data: state }));
  // }

  submit(): void {
    this.store.dispatch(new SubmitForm({ data: this.form.value }));
  }
}
