import { of as observableOf, from as fromPromise, Observable } from "rxjs";

import {
  filter,
  pluck,
  map,
  pairwise,
  mergeMap,
  switchMap,
  tap
} from "rxjs/operators";
import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { TranslateService } from "@ngx-translate/core";
import {
  Config,
  Nav,
  Platform,
  ToastController,
  LoadingController,
  ModalController,
  AlertController
} from "ionic-angular";
import { Settings } from "../core/providers/settings/settings";
import { _Modal, _ModalType } from "../core/models/_modal";
import { Store } from "@ngrx/store";
import { AppState } from "../core/app-state";
import { _Route } from "../core/models/_route";
import { _Loader } from "../core/models/_loader";
import { _Toast } from "../core/models/_toast";
import { GeolocationProvider } from "../core/providers/geolocation/geolocation-provider";
import * as fromGeolocationActions from "../core/actions/geolocation.actions";
import { GeolocationItem } from "../core/models/geolocation";
import { Startup } from "./app.startup";
import { _Alert } from "../core/models/_alert";
import { AnalyticsProvider } from "../core/providers/analytics/analytics";

@Component({
  template: `
    <ion-menu [content]="content" [swipeEnabled]="isSwipeEnabled$ | async">
      <user-panel></user-panel>
    </ion-menu>
    <yummy-header></yummy-header>
    <ion-nav #content [root]="rootPage"> </ion-nav>
  `
})
export class YummyApp {
  public rootPage = this.startup.startPage;
  public toast: any;
  public loader: any;
  public modal: any;
  public alert: any;
  public isSwipeEnabled$: Observable<boolean>;
  @ViewChild(Nav)
  private nav: Nav;

  constructor(
    private translate: TranslateService,
    platform: Platform,
    settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private store: Store<AppState>,
    private toastCtrl: ToastController,
    private loaderCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private geolocationProvider: GeolocationProvider,
    private startup: Startup,
    private analytics: AnalyticsProvider
  ) {
    this.toast = null;
    this.loader = null;
    this.modal = null;
    this.alert = null;
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.geolocationProvider.initWatch();
      this.subscribeGeo();
      this.subscribeLoader();
      this.subscribeRoute();
      this.subscribeToaster();
      this.subscribeAlert();
      this.subscribeModal();
      this.subscribeSwipe();
    });
    this.initTranslate();
  }

  private initTranslate() {
    this.translate.setDefaultLang("pl");
    this.translate.use("pl");

    this.translate.get(["BACK_BUTTON_TEXT"]).subscribe((values) => {
      this.config.set("ios", "backButtonText", values.BACK_BUTTON_TEXT);
    });
  }

  private subscribeSwipe(): void {
    this.isSwipeEnabled$ = this.store.select("_route").pipe(
      pluck("data"),
      map((routes: _Route[]) => routes[routes.length - 1]),
      map((route: _Route) => route.name !== "slide" && route.name !== "welcome")
    );
  }

  private subscribeGeo(): void {
    this.geolocationProvider.geo$
      .asObservable()
      .subscribe((geo: GeolocationItem) => {
        this.store.dispatch(
          new fromGeolocationActions.Switch({
            data: geo
          })
        );
      });
  }

  private subscribeRoute(): void {
    this.store
      .select((state) => state._route.data)
      .pipe(
        pairwise(),
        filter(
          ([prevRoutes, currRoutes]) =>
            prevRoutes[prevRoutes.length - 1].name !==
            currRoutes[currRoutes.length - 1].name
        ),
        tap(([prevRoutes, currRoutes]) =>
          this.analytics.trackPage(
            (currRoutes[currRoutes.length - 1] || { name: "map" }).name
          )
        ),
        mergeMap(([prevRoutes, currRoutes]) => {
          return currRoutes.length === 1
            ? this.setRoot(currRoutes[currRoutes.length - 1])
            : currRoutes.length < prevRoutes.length
            ? this.popPage(
                prevRoutes[prevRoutes.length - 1].name === "profile" ||
                  prevRoutes[prevRoutes.length - 1].name === "support" ||
                  prevRoutes[prevRoutes.length - 1].name === "transactions"
              )
            : this.pushPage(currRoutes[currRoutes.length - 1]);
        })
      )
      .subscribe();
  }

  private subscribeLoader(): void {
    this.store
      .select((state) => state._loader.data)
      .pipe(
        pairwise(),
        mergeMap(([prevLoader, currLoader]) => {
          return this.handleUIDisplay(
            prevLoader,
            currLoader,
            () => this.showLoader(currLoader),
            () => this.hideLoader()
          );
        })
      )
      .subscribe();
  }

  private subscribeToaster(): void {
    this.store
      .select((state) => state._toast.data)
      .pipe(
        pairwise(),
        mergeMap(([prevToast, currToast]) => {
          return this.handleUIDisplay(
            prevToast,
            currToast,
            () => this.showToast(currToast),
            () => this.hideToast()
          );
        })
      )
      .subscribe();
  }

  private subscribeAlert(): void {
    this.store
      .select((state) => state._alert.data)
      .pipe(
        pairwise(),
        mergeMap(([prevAlert, currAlert]) => {
          return this.handleUIDisplay(
            prevAlert,
            currAlert,
            () => this.showAlert(currAlert),
            () => this.hideAlert()
          );
        })
      )
      .subscribe();
  }

  private subscribeModal(): void {
    this.store
      .select((state) => state._modal.data)
      .pipe(
        pairwise(),
        mergeMap(([prevModal, currModal]) => {
          return this.handleUIDisplay(
            prevModal,
            currModal,
            () => this.showModal(currModal),
            () => this.hideModal()
          );
        })
      )
      .subscribe();
  }

  private handleUIDisplay(
    prevState: _Toast | _Loader | _Modal | _Alert,
    currState: _Toast | _Loader | _Modal | _Alert,
    shownFn: Function,
    hideFn: Function
  ): Observable<any> {
    let obs: Observable<any>;
    if (!prevState.isShown && !currState.isShown) {
      obs = observableOf(null);
    } else if (prevState.isShown && !currState.isShown) {
      obs = fromPromise(hideFn());
    } else if (!prevState.isShown && currState.isShown) {
      obs = fromPromise(shownFn());
    } else {
      obs = fromPromise(hideFn()).pipe(switchMap(() => fromPromise(shownFn())));
    }
    return obs;
  }

  private setRoot(route: _Route): Promise<any> {
    return this.nav.setRoot(route.name, route.params, {
      animate: false
    });
  }

  private pushPage(route: _Route): Promise<any> {
    return this.nav.push(route.name, route.params);
  }

  private popPage(isSide: boolean = false): Promise<any> {
    return this.nav.pop({
      animate: !isSide
    });
  }

  private showToast(toast: _Toast): Promise<any> {
    this.toast = this.toastCtrl.create({
      message: toast.label,
      position: "bottom",
      duration: 4000
    });
    return this.toast.present();
  }

  private hideToast(): Promise<any> {
    return this.toast
      ? this.toast.dismiss().then(() => (this.toast = null))
      : null;
  }

  private showAlert(alert: _Alert): Promise<any> {
    this.alert = this.alertCtrl.create({
      title: alert.title,
      message: alert.message,
      buttons: alert.buttons.map((label: string, index: number) => ({
        text: label,
        handler: alert.callbacks[index] ? alert.callbacks[index] : () => null
      }))
    });

    return this.alert.present();
  }

  private hideAlert(): Promise<any> {
    return this.alert
      ? this.alert.dismiss().then(() => (this.alert = null))
      : null;
  }

  private showLoader(loader: _Loader): Promise<any> {
    this.loader = this.loaderCtrl.create({
      content: loader.label
    });
    return this.loader.present();
  }

  private hideLoader(): Promise<any> {
    return this.loader
      ? this.loader.dismiss().then(() => (this.loader = null))
      : null;
  }

  private showModal(modal: _Modal): Promise<any> {
    this.modal = this.modalCtrl.create(modal.mode, modal.meta);

    return this.modal.present();
  }

  private hideModal(): Promise<any> {
    return this.modal
      ? this.modal.dismiss().then(() => (this.modal = null))
      : null;
  }
}
