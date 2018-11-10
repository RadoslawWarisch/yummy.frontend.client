import { Injectable } from "@angular/core";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppConfig } from "../../../app/app.config";

@Injectable()
export class AnalyticsProvider {

  constructor(private ga: GoogleAnalytics) {}

  public initTracking(): void {
    this.ga.startTrackerWithId("UA-129018078-2");
    this.ga.setAllowIDFACollection(true);
    this.ga.setAnonymizeIp(true);
    this.ga.setAppVersion(AppConfig.ver);
  }

  public trackPage(page: string): void {
    this.ga.trackView(page);
  }

  public trackEvent(
    category: string,
    label: string,
    action?: string,
    value?: number
  ): void {
    this.ga.trackEvent(category, label, action, value);
  }

  public trackError(
    description: string,
    isFatal?: boolean
  ): void {
    this.ga.trackException(description, isFatal);
  }
}
