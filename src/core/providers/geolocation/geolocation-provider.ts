import { filter, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { Subscription, BehaviorSubject } from "rxjs";
import { GeolocationItem } from "../../models/geolocation";

@Injectable()
export class GeolocationProvider {
  public geo$: BehaviorSubject<GeolocationItem>;
  public watchSub: Subscription;

  constructor(private geolocation: Geolocation) {
    this.geo$ = new BehaviorSubject<GeolocationItem>(new GeolocationItem({}));
  }

  public initWatch(): void {
    this.watchSub = this.geolocation
      .watchPosition()
      .pipe(
        catchError(() => undefined),
        filter((geo: Geoposition) => geo !== undefined),
        filter((geo: Geoposition) => geo.coords !== undefined)
      )
      .subscribe((geo: Geoposition) => {
        this.geo$.next(
          new GeolocationItem({
            lat: geo.coords.latitude,
            lng: geo.coords.longitude,
            focusLat: geo.coords.latitude,
            focusLng: geo.coords.longitude
          })
        );
      });
  }
}
