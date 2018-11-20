import { GeolocationItem } from "./geolocation";

export class Place extends GeolocationItem {
  constructor(place: Place) {
    super({
      lat: place.latitude,
      lng: place.longtitude
    });
    Object.assign(this, place);
  }

  public id: string;
  public name: string;
  public address: string;
  public description: string;
  public distance: number | string;
  public website?: string;
  public image?: string;
  public openHours: OpenSchedule;
  public latitude?: number;
  public longtitude?: number;
  public isOpen?: boolean;
  public street?: string;
  public postalCode?: string;
  public city?: string;
  public imgError?: boolean;
}

export interface OpenSchedule {
  week?: OpenHours,
  saturday?: OpenHours,
  sunday?: OpenHours
}

export interface OpenHours {
  openTime: string,
  closeTime: string
}