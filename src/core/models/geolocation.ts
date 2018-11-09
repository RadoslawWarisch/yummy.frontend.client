export class GeolocationItem {
  constructor(geolocation: GeolocationItem) {
    Object.assign(this, geolocation);
  }

  public lat?: number;
  public lng?: number;
  public zoom?: number;
  public focusLat?: number;
  public focusLng?: number;
}