import { Component, ElementRef } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { Store } from "@ngrx/store";
import { AppState } from "../../core/app-state";
import * as fromFormAction from "../../core/actions/login-form.actions";
import { LoginForm } from "../../core/models/login-form";
import { Observable, Subscription } from "rxjs";
import { AppConfig, Env } from "../../app/app.config";
import * as fromLoaderActions from "../../core/actions/_loader.actions";
import * as fromToastActions from "../../core/actions/_toast.actions";
import { Rest } from "../../core/providers/rest/rest";

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

  constructor(private store: Store<AppState>, private rest: Rest) {}

  ionViewWillEnter() {
    // if (AppConfig.env === Env.DEV) {
    //   this.store.dispatch(new fromFormAction.UpdateForm({
    //     data: {
    //       login: 'user2@restaurant.com',
    //       password: 'user2'
    //     }
    //   }));
    //   this.store.dispatch(new fromFormAction.SubmitForm({
    //     data: {
    //       login: 'user2@restaurant.com',
    //       password: 'user2'
    //     }
    //   }));
    // }
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
