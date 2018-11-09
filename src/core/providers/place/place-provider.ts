
import {of as observableOf,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Rest, GetPlacesBody } from "../rest/rest";
import { HttpErrorResponse } from "@angular/common/http";
import { Place } from "../../models/place";
import { round } from "mathjs";
import {
  isSaturday as checkIsSaturday,
  isSunday as checkIsSunday,
  getHours
} from "date-fns";

@Injectable()
export class PlaceProvider {
  constructor(private rest: Rest) {}

  public fetchPlaces(config: GetPlacesBody) {
    return this.rest
      .getPlaces(config).pipe(
      map((res) => res.restaurants),
      map(this.parsePlaces),
      catchError((err: HttpErrorResponse) => observableOf(err)),);
  }

  private parsePlaces(unparsed: Place[]): Place[] {
    const getAddressDetailed = (place: Place): any => {
      const addressArray: string[] = place.address.split(",") || [];

      return {
        street: addressArray[0] || "",
        postalCode: addressArray[1] || "",
        city: addressArray[2] || ""
      };
    };

    const parseDistance = (unparsed: number): string => {
      return `${round(unparsed / 1000, 1)} km`;
    };

    const checkIfOpen = (place: Place): boolean => {
      const isSaturday: boolean = checkIsSaturday(new Date());
      const isSunday: boolean = checkIsSunday(new Date());
      const hour: number = getHours(new Date());
  
      const {
        week,
        saturday,
        sunday
      } = JSON.parse(place.openHours as string);
  
      if (isSaturday) {
        return (saturday)
          ? hour >= Number(saturday.openTime.split(":")[0]) && hour < Number(saturday.closeTime.split(":")[0])
          : false;
      } else if (isSunday) {
        return (sunday) 
          ? hour >= Number(sunday.openTime.split(":")[0]) && hour < Number(sunday.closeTime.split(":")[0])
          : false;
      } else {
        return (week) 
          ? hour >= Number(week.openTime.split(":")[0]) && hour < Number(week.closeTime.split(":")[0])
          : false;
      }
    }

    return unparsed.map((place: Place) => ({
      ...place,
      ...getAddressDetailed(place),
      distance: parseDistance(Number(place.distance)),
      openHours: JSON.parse(place.openHours as string),
      isOpen: checkIfOpen(place)
    }));
  }
}
