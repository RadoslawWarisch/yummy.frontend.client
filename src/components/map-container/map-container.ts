import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeolocationItem } from '../../core/models/geolocation';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';
import * as fromGeolocationActions from '../../core/actions/geolocation.actions';
import { Place } from '../../core/models/place';

declare let L;

const defaultGeo: GeolocationItem = {
  lat: 50.067,
  lng: 19.945
}

interface MapConfig {
  center: number[],
  minZoom: number,
  zoom: number
}

@Component({
  selector: 'map-container',
  templateUrl: 'map-container.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapContainerComponent {
  private map: any;
  private placesSub: Subscription;
  private places: Place[];
  private markers: any[];

  constructor(
    private store: Store<AppState>
  ) {
    this.places = [];
    this.markers = [];
  }

  ngOnInit() {
    this.initMap('map', {
      center: [defaultGeo.lat, defaultGeo.lng],
      minZoom: 10,
      zoom: 14
    });
    this.initLayer();
    this.initEvents();
    this.subscribePlaces();
  }

  ngOnDestroy(): void {
    this.map.off('dragend', this.handleEvent.bind(this));
  }

  private subscribePlaces(): void {
    this.placesSub = this.store.select((state) => state.place.data)
      .subscribe((places: Place[]) => this.handlePlacesBatch(places));
  }

  private initMap(id: string, config: MapConfig): void {
    this.map = L.map(id, config);
  }

  private initLayer(): void {
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: ['a','b','c']
    }).addTo(this.map);
  }

  private initEvents(): void {
    this.map.on('dragend', this.handleEvent.bind(this));
  }

  private handleEvent(): void {
    this.store.dispatch(new fromGeolocationActions.Set({
      data: this.getMapCenter()
    }));
  }

  private setMapCenter(center: GeolocationItem): void {
    this.map.panTo(new L.LatLng(center.lat, center.lng));
  }

  private getMapCenter(): GeolocationItem {
    return this.map.getCenter();
  }

  private handlePlacesBatch(places: Place[]): void {
    places.forEach((place: Place) => {
      if (!this.checkIfMarkerAdded(place.id)) {
        this.places = [...this.places, place];
        this.addMarker(place);
      } 
    });
  }

  private checkIfMarkerAdded(id: string): boolean {
    return this.markers.findIndex((marker: any) => marker.alt === id) !== -1;
  }

  private addMarker(place: Place): void {
    const getIcon = () => L.icon({
      iconUrl: 'assets/img/yummy-pin.png',
      iconSize: [32, 50]
    });
    
    const marker = L.marker([
      place.lat || place.latitude,
      place.lng || place.longtitude
    ], {
      icon: getIcon(),
      autoPan: true,
      title: place.name,
      alt: place.id
    });

    marker.addTo(this.map);
    marker.on('mouseover', this.handleMarkerClick.bind(this));
  }

  private removeMarker(id: string) {
    const marker = this.markers.find((marker: any) => marker.alt === id);
    
    marker.off('mouseover', this.handleMarkerClick.bind(this));
    marker.removeFrom(this.map);
  }

  private handleMarkerClick({ sourceTarget: marker }) {
    console.log()
    marker.bindPopup('BBB').openPopup();
  }

}
