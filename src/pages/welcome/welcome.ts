import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { Store } from "@ngrx/store";
import { AppState } from "../../core/app-state";
import * as fromFormAction from "../../core/actions/login-form.actions";
import { AppConfig, Env } from "../../app/app.config";
import { LoginForm } from "../../core/models/login-form";

@IonicPage({
  name: "welcome"
})
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  public isLoginMode: boolean = true;

  constructor(private store: Store<AppState>) {}

  ionViewWillEnter() {
    //TODO Remove on prd
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
