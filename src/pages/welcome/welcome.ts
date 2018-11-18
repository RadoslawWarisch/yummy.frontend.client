import { Component, ElementRef } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { Store } from "@ngrx/store";
import { AppState } from "../../core/app-state";
import * as fromFormAction from "../../core/actions/login-form.actions";
import { LoginForm } from "../../core/models/login-form";
import { Observable, Subscription } from "rxjs";
import { AppConfig, Env } from "../../app/app.config";

declare const window: any;

@IonicPage({
  name: "welcome"
})
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  public isLoginMode: boolean = true;
  public keyboardShowSub: Subscription;
  public keyboardHideSub: Subscription;

  constructor(private store: Store<AppState>, private el: ElementRef) {}

  ionViewWillEnter() {
    
  }

  ngOnDestroy() {}

  public switchLoginMode(isLogin: boolean): void {
    this.isLoginMode = isLogin;
    this.store.dispatch(
      new fromFormAction.UpdateForm({
        data: new LoginForm({
          login: "",
          password: ""
        })
      })
    );
  }
}
