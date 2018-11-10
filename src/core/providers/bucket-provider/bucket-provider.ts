
import {of as observableOf,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Bucket } from "../../models/bucket";
import { Offer } from "../../models/offer";
import { SubmitBucketBody, Rest } from "../rest/rest";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class BucketProvider {
  constructor(
    private rest: Rest
  ) {}

  public recalculateBucket(bucket: Bucket): Bucket {
    const { offers } = bucket;
    const updatedCount: number = offers.reduce(
      (count: number, currOffer: Offer) => {
        return count + currOffer.count;
      },
      0
    );
    const updatedPrice: number = offers.reduce(
      (price: number, currOffer: Offer) => {
        return price + (currOffer.calculatedPrice * currOffer.count);
      },
      0
    );

    return {
      ...bucket,
      count: updatedCount,
      price: updatedPrice
    };
  }

  public addToBucket(offer: Offer, currentBucket: Bucket): Bucket {
    const isOfferAdded: boolean =
      currentBucket.offers.findIndex(
        (buckOffer: Offer) => buckOffer.id === offer.id
      ) !== -1;

    const getIncremented = (): Offer[] => {
      const updatedCount: number =
        (
          currentBucket.offers.find(
            (buckOffer: Offer) => buckOffer.id === offer.id
          ) || {
            count: 0
          }
        ).count + 1;

      return [
        ...[...currentBucket.offers].filter(
          (buckOffer: Offer) => buckOffer.id !== offer.id
        ),
        {
          ...offer,
          count: updatedCount
        }
      ];
    };

    return isOfferAdded
      ? {
          ...currentBucket,
          offers: getIncremented()
        }
      : {
          ...currentBucket,
          offers: [
            ...currentBucket.offers,
            {
              ...offer,
              count: 1
            }
          ],
          restaurantId: offer.restaurantId
        };
  }

  public removeFromBucket(offerId: string, currentBucket: Bucket): Bucket {
    const isOfferIncremented: boolean =
      (
        currentBucket.offers.find(
          (buckOffer: Offer) => buckOffer.id === offerId
        ) || {
          count: 0
        }
      ).count > 1;

    const getDecremented = (): Offer[] => {
      const updatedOffer: Offer = currentBucket.offers.find(
        (buckOffer: Offer) => buckOffer.id === offerId
      );

      return [
        ...[...currentBucket.offers].filter(
          (buckOffer: Offer) => buckOffer.id !== offerId
        ),
        {
          ...updatedOffer,
          count: updatedOffer.count - 1
        }
      ];
    };

    return isOfferIncremented
      ? {
          ...currentBucket,
          offers: getDecremented()
        }
      : {
          ...currentBucket,
          offers: [
            ...currentBucket.offers.filter(
              (buckOffer: Offer) => buckOffer.id !== offerId
            )
          ]
        };
  }

  public submitBucket(bucket: Bucket): Observable<any> {
    const body: SubmitBucketBody = {
      receiveTimestamp: new Date(),
      transactions: bucket.offers.map(({ id: offerId, count }) => ({
        offerId, count
      }))
    }

    return this.rest.submitBucket(body).pipe(
      map(({ paymentCode, orderId }) => ({
        paymentCode,
        orderId,
        restaurantId: bucket.restaurantId,
        price: bucket.price
      })),
      catchError((err: HttpErrorResponse) => observableOf(err)),);
  }
}
