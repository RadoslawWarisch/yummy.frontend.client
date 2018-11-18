import { of as observableOf, Observable, of, combineLatest } from "rxjs";

import { catchError, map, mergeMap, pluck, take } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Rest } from "../rest/rest";
import { HttpErrorResponse } from "@angular/common/http";
import { Offer } from "../../models/offer";
import { format } from "date-fns";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { Place } from "../../models/place";
import { PlaceProvider } from "../place/place-provider";

interface OffersRes {
  offers: Offer[];
}

@Injectable()
export class OfferProvider {
  constructor(
    private rest: Rest,
    private store: Store<AppState>,
    private placeProvider: PlaceProvider
  ) {}

  public getOffers({ restaurantId }): Observable<any> {
    return this.rest.getOffers(restaurantId).pipe(
      map((res: OffersRes) => ({
        ...res,
        offers: res.offers.map(this.parseOffer)
      })),
      mergeMap((res: any) =>
        restaurantId ? of(res) : this.appendPlaceInfo(res)
      ),
      catchError((err: HttpErrorResponse) => observableOf(err))
    );
  }

  private parseOffer(unparsed: Offer): Offer {
    const calculatePrice = () => {
      return Math.round((unparsed.price * (100 - unparsed.discount)) / 10) / 10;
    };

    return {
      ...unparsed,
      calculatedPrice: calculatePrice(),
      startDate: format(unparsed.receiveTimeStart, "HH:mm"),
      endDate: format(unparsed.receiveTimeEnd, "HH:mm")
    };
  }

  private appendPlaceInfo(res: OffersRes): Observable<OffersRes> {
    const appendPlace = (offer: Offer): Observable<Offer> =>
      this.store.select("place").pipe(
        take(1),
        pluck("data"),
        mergeMap((places: Place[]) => {
          const foundPlace: Place = findPlace(offer.restaurantId)(places);

          return foundPlace
            ? of(foundPlace)
            : this.placeProvider.fetchSinglePlace(String(offer.restaurantId));
        }),
        map((place: Place) => ({
          ...offer,
          place
        }))
      );
    const findPlace = (id: string | number) => (
      places: Place[]
    ): Place | null => places.find((place: Place) => place.id === id);
    return combineLatest(res.offers.map(appendPlace)).pipe(
      map((offers: Offer) => ({
        ...res,
        offers
      }))
    );
  }
}
