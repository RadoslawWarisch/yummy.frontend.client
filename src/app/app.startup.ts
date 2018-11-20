import { map, timeout } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Rest } from "../core/providers/rest/rest";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Platform } from "ionic-angular";
import { AnalyticsProvider } from "../core/providers/analytics/analytics";

declare const localStorage, window;

@Injectable()
export class Startup {
  public startPage: string;

  constructor(
    private rest: Rest,
    private splash: SplashScreen,
    private analytics: AnalyticsProvider,
    private platform: Platform
  ) {}

  public init(): Promise<void> {
    return Promise.resolve(true)//this.waitForPlatform()
      .then(() => Promise.all([this.checkIsDemoDone(), this.checkBearer()]))
      .then(([isDemoDone, isBearer]) => {
        if (!isDemoDone) {
          this.startPage = "slide";
          localStorage.setItem("isDemoDone", "true");
        } else if (isBearer) {
          this.startPage = "map";
        } else {
          this.startPage = "welcome";
        }
        this.splash.hide();
        this.analytics.initTracking();
        return Promise.resolve();
      });
  }

  private waitForPlatform(): Promise<void> {
    return window.cordova
      ? Promise.race([this.ready(), this.platform.ready()])
      : Promise.resolve(null);
  }

  private checkIsDemoDone(): Promise<boolean> {
    return Promise.resolve(localStorage.getItem("isDemoDone") === "true");
  }

  private checkBearer(): Promise<boolean> {
    return this.rest
      .checkBearer()
      .pipe(
        timeout(3000),
        map(() => true)
      )
      .toPromise()
      .catch(() => false);
  }

  private ready(): Promise<void> {
    return new Promise((resolve: () => null) => {
      document.addEventListener("deviceready", resolve, false);
    });
  }
}
