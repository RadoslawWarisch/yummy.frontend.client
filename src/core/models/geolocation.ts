export class GeolocationItem {
  constructor(geolocation: GeolocationItem) {
    this.lat = 50.067;
    this.lng = 19.945;
    Object.assign(this, geolocation);
  }

  public lat?: number;
  public lng?: number;
}