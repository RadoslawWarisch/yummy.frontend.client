
import {of as observableOf,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Rest } from "../rest/rest";
import { HttpErrorResponse } from "@angular/common/http";
import { Offer } from "../../models/offer";
import {
  format
} from "date-fns";

@Injectable()
export class OfferProvider {
  constructor(
    private rest: Rest
  ) {}

  public getOffers({ restaurantId }): Observable<any> {
    return this.rest
      .getOffers(restaurantId).pipe(
      map((res: any) => ({
        ...res,
        offers: res.offers.map(this.parseOffer)
      })),
      catchError((err: HttpErrorResponse) => observableOf(err)),);
  }

  private parseOffer(unparsed: Offer): Offer {
    const calculatePrice = () => {
      return Math.round(unparsed.price*(100 - unparsed.discount)/10)/10;
    }

    return {
      ...unparsed,
      calculatedPrice: calculatePrice(),
      startDate: format(unparsed.receiveTimeStart, "HH:mm"),
      endDate: format(unparsed.receiveTimeEnd, "HH:mm")
    }
  }
}
