import { map, timeout } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Rest } from "../core/providers/rest/rest";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Platform } from "ionic-angular";
import { HTTP } from "@ionic-native/http";
import { AnalyticsProvider } from "../core/providers/analytics/analytics";

declare const localStorage;

@Injectable()
export class Startup {
  public startPage: string;

  constructor(
    private rest: Rest,
    private splash: SplashScreen,
    private analytics: AnalyticsProvider
  ) {}

  public init(): Promise<void> {
    return Promise.all([this.checkIsDemoDone(), this.checkBearer()]).then(
      ([isDemoDone, isBearer]) => {
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
      }
    );
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
}
