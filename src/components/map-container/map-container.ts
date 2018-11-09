import { take, debounceTime, pluck, filter, mergeMap } from "rxjs/operators";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Subscription, Subject, Observable, of, fromEvent } from "rxjs";
import { GeolocationItem } from "../../core/models/geolocation";
import { Store } from "@ngrx/store";
import { AppState } from "../../core/app-state";
import * as fromGeolocationActions from "../../core/actions/geolocation.actions";
import * as fromRouteActions from "../../core/actions/_route.actions";
import { Place } from "../../core/models/place";
import { NavParams, ToastController } from "ionic-angular";

declare const L, window;

interface MapConfig {
  center: number[];
  minZoom: number;
  zoom: number;
}

@Component({
  selector: "map-container",
  templateUrl: "map-container.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapContainerComponent {
  private map: any;
  private placesSub: Subscription;
  private dragSub: Subscription;
  private places: Place[];
  private drag$: Subject<void>;
  private markers: any[];
  private popups: any[];
  private mapToast: any;

  constructor(
    private store: Store<AppState>,
    private navParams: NavParams,
    private toastCtrl: ToastController
  ) {
    this.places = [];
    this.popups = [];
    this.markers = [];
    this.drag$ = new Subject<void>();
  }

  ngOnInit() {
    this.initFocusPoint().subscribe(
      ({ lat, lng, focusLat, focusLng, zoom }) => {
        this.initMap("map", {
          center: [focusLat, focusLng],
          minZoom: 11,
          zoom: zoom
        });
        this.initLayer();
        this.initEvents();
        this.addUserMarker(lat, lng);
        this.subscribePlaces();
        this.subscribeDrag();
        this.switchGeo();
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribePlaces();
    this.unsubscribeDrag();
  }

  private subscribePlaces(): void {
    this.placesSub = this.store
      .select((state) => state.place.data)
      .subscribe((places: Place[]) => this.handlePlacesBatch(places));
  }

  private unsubscribePlaces(): void {
    this.placesSub.unsubscribe();
  }

  private subscribeDrag(): void {
    this.dragSub = this.drag$
      .asObservable()
      .pipe(
        filter(() => !this.mapToast),
        debounceTime(750)
      )
      .subscribe(this.askForSwitch.bind(this));
  }

  private unsubscribeDrag(): void {
    this.dragSub.unsubscribe();
  }

  private initMap(id: string, config: MapConfig): void {
    this.map = L.map(id, config);
  }

  private initLayer(): void {
    L.tileLayer(
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}" +
        (L.Browser.retina ? "@2x.png" : ".png"),
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: ["a", "b", "c"]
      }
    ).addTo(this.map);
  }

  private initEvents(): void {
    this.map.on("dragend", () => this.drag$.next());
  }

  private askForSwitch(): void {
    this.mapToast = this.toastCtrl.create({
      message: "Wyszukaj w tym obszarze",
      cssClass: "map-toast",
      position: "bottom",
      showCloseButton: true,
      dismissOnPageChange: true
    });

    this.mapToast.onDidDismiss(() => {
      this.switchGeo();
      this.mapToast = null;
    });

    this.mapToast.present();
  }

  private switchGeo(): void {
    this.store.dispatch(
      new fromGeolocationActions.Focus({
        data: {
          focusLat: this.getMapCenter().lat,
          focusLng: this.getMapCenter().lng
        }
      })
    );
  }

  private initFocusPoint(): Observable<GeolocationItem> {
    const focusId: string = this.navParams.get("restaurantId");

    const getPlacePoint = (): Observable<GeolocationItem> => {
      const lat = this.navParams.get("restaurantLat");
      const lng = this.navParams.get("restaurantLng");

      return of(
        new GeolocationItem({
          focusLat: lat,
          focusLng: lng
        })
      ).pipe(
        mergeMap(
          () =>
            this.store.select("geolocation").pipe(
              pluck("data"),
              take(1)
            ),
          (focusGeo, storeGeo) => ({
            ...storeGeo,
            ...focusGeo
          })
        )
      );
    };
    const getUserPoint = (): Observable<GeolocationItem> =>
      this.store.select("geolocation").pipe(
        pluck("data"),
        take(1)
      );

    return focusId ? getPlacePoint() : getUserPoint();
  }

  private setMapCenter(center: GeolocationItem): void {
    this.map.panTo(new L.LatLng(center.lat, center.lng));
  }

  private getMapCenter(): GeolocationItem {
    return this.map.getCenter();
  }

  private handlePlacesBatch(places: Place[]): void {
    places
      .filter((place: Place) => {
        return (
          this.places.findIndex(
            (currentPlace: Place) => currentPlace.id === place.id
          ) === -1
        );
      })
      .forEach((place: Place) => {
        if (!this.checkIfMarkerAdded(place.id)) {
          this.places = [...this.places, place];
          this.addPlaceMarker(place);
        }
      });
  }

  private checkIfMarkerAdded(id: string): boolean {
    return this.markers.findIndex((marker: any) => marker.alt === id) !== -1;
  }

  private addUserMarker(lat: number, lng: number): void {
    const getIcon = () =>
      L.icon({
        iconUrl: "assets/icon/geouser.svg",
        iconSize: [20, 20]
      });

    const marker = L.marker([lat, lng], {
      icon: getIcon(),
      autoPan: true
    });

    marker.addTo(this.map);
  }

  private addPlaceMarker(place: Place): void {
    const getIcon = () =>
      L.icon({
        iconUrl: "assets/icon/pin.svg",
        iconSize: [40, 50]
      });

    const marker = L.marker(
      [place.lat || place.latitude, place.lng || place.longtitude],
      {
        icon: getIcon(),
        title: place.name,
        alt: place.id
      }
    );

    marker.addTo(this.map);

    const { popup, markerTarget } = this.addPlacePopup({
      marker,
      place: place.name,
      address: place.address,
      image: place.image,
      distance: place.distance
    });

    marker.on("click", () =>
      this.openPopup({ marker: markerTarget, popup, id: place.id })
    );
    this.markers = [...this.markers, marker];
  }

  private addPlacePopup({ marker, place, address, image, distance }): any {
    const popup = L.popup().setContent(
      `<div class="map__popup">
      <div
        class="item__photo">
      ${
        image
          ? "<img src= " + image + " />"
          : '<div class="photo__placeholder"><ion-icon name="image"></ion-icon></div>'
      }
      </div>
      <div class="field title medium uppercased bold">${place}</div>
      <div class="field tiny">${address}</div>
      <div class="field tiny">Odległość: <span class="bold secondary-color">${distance}</span></div>
    </div>`
    );
    const markerTarget = marker.bindPopup(popup).getPopup();

    return { markerTarget, popup };
  }

  private openPopup({ marker, popup, id }): void {
    marker.openPopup();
    this.popups = [...this.popups, popup];

    setTimeout(() => {
      let sub: Subscription = fromEvent(
        document.querySelector(".map__popup"),
        "click"
      )
        .pipe(take(1))
        .subscribe(() => this.handlePopupClick(id, sub));
    }, 200);
  }

  // private removeMarker(id: string) {
  //   const marker = this.markers.find((marker: any) => marker.alt === id);

  //   marker.off("mouseover", this.openPopup.bind(this));
  //   marker.removeFrom(this.map);
  // }

  private handlePopupClick(id: string, sub: Subscription): void {
    this.goToPlace(id);
    sub.unsubscribe();
  }

  private goToPlace(id: string): void {
    const choosenPlace: Place = this.places.find(
      (place: Place) => place.id === id
    );

    this.store.dispatch(
      new fromRouteActions.Push({
        name: "place",
        params: {
          place: choosenPlace
        }
      })
    );
  }
}
