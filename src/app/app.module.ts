import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import {
  ErrorHandler,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  APP_INITIALIZER
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Camera } from "@ionic-native/camera";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicStorageModule, Storage } from "@ionic/storage";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { ReactiveFormsModule } from "@angular/forms";
import { Platform } from 'ionic-angular';

import { YummyApp } from "./app.component";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { Reducers } from "../core/reducers/reducers";
import { Effects } from "../core/effects/effects";
import { Settings } from "../core/providers/settings/settings";
import { Providers } from "../core/providers/providers";
import { HttpInterceptorProvider } from "../core/providers/http-interceptor/http-interceptor";
import { Geolocation } from "@ionic-native/geolocation";
import { UserPanelComponent } from "../components/user-panel/user-panel";
import { DirectivesModule } from "../directives/directives.module";
import { YummyHeaderModule } from "../components/yummy-header/yummy-header.module";
import { Startup } from "./app.startup";
import { LaunchNavigator } from "@ionic-native/launch-navigator";
import { NativeHttpModule, NativeHttpBackend, NativeHttpFallback } from 'ionic-native-http-connection-backend';
import { HttpBackend, HttpXhrBackend } from '@angular/common/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

export function startupFactory(startupProvider: Startup): Function {
  return () => startupProvider.init();
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function provideSettings(storage: Storage) {
  return new Settings(storage);
}

@NgModule({
  declarations: [YummyApp, UserPanelComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NativeHttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(YummyApp, {
      platforms: {
        ios: {
          menuType: "overlay"
        }
      }
    }),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(Reducers),
    EffectsModule.forRoot(Effects),
    ReactiveFormsModule,
    DirectivesModule,
    YummyHeaderModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [YummyApp, UserPanelComponent],
  providers: [
    ...Providers,
    Geolocation,
    Camera,
    SplashScreen,
    StatusBar,
    LaunchNavigator,
    GoogleAnalytics,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorProvider,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: startupFactory,
      deps: [Startup],
      multi: true
    },
      {provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend]},
  
    Startup
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}
