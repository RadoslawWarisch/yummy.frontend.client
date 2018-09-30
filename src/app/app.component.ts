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
  MenuController
} from "ionic-angular";
import { Settings } from "../core/providers/settings/settings";
import { _Modal, _ModalType } from "../core/models/_modal";
import { Store } from "@ngrx/store";
import { AppState } from "../core/app-state";
import { _Route } from "../core/models/_route";
import { fromPromise } from "rxjs/observable/fromPromise";
import { Observable } from "rxjs";
import { _Loader } from "../core/models/_loader";
import { _Toast } from "../core/models/_toast";
import { GeolocationProvider } from "../core/providers/geolocation/geolocation-provider";
import * as fromGeolocationActions from "../core/actions/geolocation.actions";
import { GeolocationItem } from "../core/models/geolocation";
import { Startup } from "./app.startup";

@Component({
  template: ` 
    <ion-menu [content]="content" swipeEnabled="false">
      <user-panel></user-panel>
    </ion-menu>
    <yummy-header></yummy-header>
    <ion-nav #content [root]="rootPage">
    </ion-nav>
  `
})
export class YummyApp {
  public rootPage = this.startup.startPage;
  public toast: any;
  public loader: any;
  public modal: any;
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
    private geolocationProvider: GeolocationProvider,
    private startup: Startup
  ) {
    this.toast = null;
    this.loader = null;
    this.modal = null;
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.subscribeLoader();
      this.subscribeRoute();
      this.subscribeToaster();
      this.subscribeModal();
      this.geolocationProvider.initWatch();
    });
    this.initTranslate();
  }

  initTranslate() {
    this.translate.setDefaultLang("pl");
    this.translate.use("pl");

    this.translate.get(["BACK_BUTTON_TEXT"]).subscribe((values) => {
      this.config.set("ios", "backButtonText", values.BACK_BUTTON_TEXT);
    });
  }

  subscribeGeo(): void {
    this.geolocationProvider.geo$
      .asObservable()
      .subscribe((geo: GeolocationItem) => {
        this.store.dispatch(
          new fromGeolocationActions.Focus({
            data: geo
          })
        );
      });
  }

  subscribeRoute(): void {
    this.store
      .select((state) => state._route.data)
      .pairwise()
      .filter(
        ([prevRoutes, currRoutes]) =>
          prevRoutes[prevRoutes.length - 1].name !==
          currRoutes[currRoutes.length - 1].name
      )
      .mergeMap(([prevRoutes, currRoutes]) => {
        return currRoutes.length === 1
          ? this.setRoot(currRoutes[currRoutes.length - 1])
          : currRoutes.length < prevRoutes.length
            ? this.popPage()
            : this.pushPage(currRoutes[currRoutes.length - 1]);
      })
      .subscribe();
  }

  subscribeLoader(): void {
    this.store
      .select((state) => state._loader.data)
      .pairwise()
      .mergeMap(([prevLoader, currLoader]) => {
        return this.handleUIDisplay(
          prevLoader,
          currLoader,
          () => this.showLoader(currLoader),
          () => this.hideLoader()
        );
      })
      .subscribe();
  }

  subscribeToaster(): void {
    this.store
      .select((state) => state._toast.data)
      .pairwise()
      .mergeMap(([prevToast, currToast]) => {
        return this.handleUIDisplay(
          prevToast,
          currToast,
          () => this.showToast(currToast),
          () => this.hideToast()
        );
      })
      .subscribe();
  }

  subscribeModal(): void {
    this.store
      .select((state) => state._modal.data)
      .pairwise()
      .mergeMap(([prevModal, currModal]) => {
        return this.handleUIDisplay(
          prevModal,
          currModal,
          () => this.showModal(currModal),
          () => this.hideModal()
        );
      })
      .subscribe();
  }

  handleUIDisplay(
    prevState: _Toast | _Loader | _Modal,
    currState: _Toast | _Loader | _Modal,
    shownFn: Function,
    hideFn: Function
  ): Observable<any> {
    let obs: Observable<any>;
    if (!prevState.isShown && !currState.isShown) {
      obs = Observable.of(null);
    } else if (prevState.isShown && !currState.isShown) {
      obs = fromPromise(hideFn());
    } else if (!prevState.isShown && currState.isShown) {
      obs = fromPromise(shownFn());
    } else {
      obs = fromPromise(hideFn()).switchMap(() => fromPromise(shownFn()));
    }
    return obs;
  }

  setRoot(route: _Route): Promise<any> {
    return this.nav.setRoot(route.name, route.params, {
      animate: false
    });
  }

  pushPage(route: _Route): Promise<any> {
    return this.nav.push(route.name, route.params);
  }

  popPage(): Promise<any> {
    return this.nav.pop();
  }

  showToast(toast: _Toast): Promise<any> {
    this.toast = this.toastCtrl.create({
      message: toast.label,
      position: "bottom",
      duration: 4000
    });
    return this.toast.present();
  }

  hideToast(): Promise<any> {
    return this.toast.dismiss();
  }

  showLoader(loader: _Loader): Promise<any> {
    this.loader = this.loaderCtrl.create({
      content: loader.label
    });
    return this.loader.present();
  }

  hideLoader(): Promise<any> {
    return this.loader.dismiss();
  }

  showModal(modal: _Modal): Promise<any> {
    return Promise.resolve();
  }

  hideModal(): Promise<any> {
    return this.modal.dismiss();
  }
}
