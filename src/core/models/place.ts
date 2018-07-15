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
  public website?: string;
  public image?: string;
  public openHours: OpenSchedule;
  public latitude?: number;
  public longtitude?: number;
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