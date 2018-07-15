import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Camera } from "@ionic-native/camera";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicStorageModule, Storage } from "@ionic/storage";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { ReactiveFormsModule } from "@angular/forms";

import { YummyApp } from "./app.component";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { Reducers } from "../core/reducers/reducers";
import { Effects } from "../core/effects/effects";
import { Settings } from "../core/providers/settings/settings";
import { Providers } from "../core/providers/providers";
import { HttpInterceptorProvider } from "../core/providers/http-interceptor/http-interceptor";
import { SignupModalComponent } from "../components/signup-modal/signup-modal";
import { Geolocation } from "@ionic-native/geolocation";
import { UserPanelComponent } from "../components/user-panel/user-panel";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function provideSettings(storage: Storage) {
  return new Settings(storage);
}

@NgModule({
  declarations: [
    YummyApp,
    SignupModalComponent,
    UserPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(YummyApp),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(Reducers),
    EffectsModule.forRoot(Effects),
    ReactiveFormsModule,
    LeafletModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    YummyApp,
    SignupModalComponent,
    UserPanelComponent
  ],
  providers: [
    ...Providers,
    Geolocation,
    Camera,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorProvider,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
