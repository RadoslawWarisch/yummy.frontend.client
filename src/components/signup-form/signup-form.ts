import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../core/app-state";
import * as fromLoginActions from "../../core/actions/login-form.actions";

@Component({
  selector: "signup-form",
  templateUrl: "signup-form.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent {
  @Output()
  public loginEmitter: EventEmitter<void>;
  private form: FormGroup;
  private form$: any;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.loginEmitter = new EventEmitter<void>();
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
      password: ["", Validators.required],
      passwordConfirm: ["", Validators.required]
    });
  }

  observeChanges(): void {
    this.form.valueChanges.subscribe((state) => {
      this.dispatchChanges(state);
    });
  }

  dispatchChanges(state: any): void {
    this.store.dispatch(new fromLoginActions.UpdateForm({ data: state }));
  }

  submit(): void {
    this.store.dispatch(
      new fromLoginActions.SubmitForm({
        data: {
          ...this.form.value,
          isSign: true
        }
      })
    );
  }
}
