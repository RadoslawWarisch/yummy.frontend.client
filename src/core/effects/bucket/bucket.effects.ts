import {
  of as observableOf,
  combineLatest as observableCombineLatest,
  Observable,
  of
} from "rxjs";

import { mergeMap, tap, take, map, switchMap, pluck } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as fromActions from "../../actions/bucket.actions";
import * as fromLoaderActions from "../../actions/_loader.actions";
import * as fromToastActions from "../../actions/_toast.actions";
import * as fromRouteActions from "../../actions/_route.actions";
import * as fromTransactionActions from "../../actions/transaction.actions";
import * as fromAlertActions from "../../actions/_alert.actions";
import { BucketProvider } from "../../providers/bucket-provider/bucket-provider";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { Offer } from "../../models/offer";
import { HttpErrorResponse } from "@angular/common/http";
import { _Route } from "../../models/_route";
import { _Alert } from "../../models/_alert";
import { Bucket } from "../../models/Bucket";
import { AnalyticsProvider } from "../../providers/analytics/analytics";

@Injectable()
export class BucketEffects {
  constructor(
    private actions$: Actions,
    private bucketProvider: BucketProvider,
    private store: Store<AppState>,
    private analytics: AnalyticsProvider
  ) {}

  @Effect()
  public addToBucket$ = this.actions$.ofType(fromActions.ADD_TO_BUCKET).pipe(
    pluck("payload"),
    switchMap((offer: Offer) =>
      observableCombineLatest(
        observableOf(offer),
        this.store.select("bucket").pipe(take(1))
      )
    ),
    switchMap(([offer, bucket]) => this.handleRestaurantSwitch(offer, bucket)),
    map((res: any | HttpErrorResponse) =>
      res instanceof HttpErrorResponse
        ? res
        : this.bucketProvider.addToBucket(res[0], res[1])
    ),
    map((res: Bucket | HttpErrorResponse) =>
      res instanceof HttpErrorResponse
        ? res
        : this.bucketProvider.recalculateBucket(res)
    ),
    map((res: Bucket | HttpErrorResponse) =>
      res instanceof HttpErrorResponse
        ? new fromActions.CanceledUpdateBucket()
        : new fromActions.UpdateBucket(res)
    )
  );

  @Effect()
  public removeFromBucket$ = this.actions$
    .ofType(fromActions.REMOVE_FROM_BUCKET)
    .pipe(
      pluck("payload"),
      switchMap((offerId: string) =>
        observableCombineLatest(
          observableOf(offerId),
          this.store.select("bucket").pipe(take(1))
        )
      ),
      map(([offerId, bucket]) =>
        this.bucketProvider.removeFromBucket(offerId, bucket)
      ),
      map((bucket: Bucket) => this.bucketProvider.recalculateBucket(bucket)),
      map((bucket: Bucket) => new fromActions.UpdateBucket(bucket))
    );

  @Effect()
  public submitBucket$ = this.actions$.ofType(fromActions.SUBMIT_BUCKET).pipe(
    tap(() =>
      this.store.dispatch(
        new fromLoaderActions.Show("Realizacja zamówienia...")
      )
    ),
    switchMap(() => this.store.select("bucket").pipe(take(1))),
    switchMap((bucket: Bucket) => this.bucketProvider.submitBucket(bucket)),
    tap(() => this.store.dispatch(new fromLoaderActions.Hide())),
    tap((res: any | HttpErrorResponse) =>
      res instanceof HttpErrorResponse
        ? this.handleSideFail()
        : this.handleSideSuccess(res)
    ),
    mergeMap(
      (res: any | HttpErrorResponse) =>
        new Promise((resolve) => setTimeout(() => resolve(res), 500))
    ),
    tap((res: any | HttpErrorResponse) => !(res instanceof HttpErrorResponse) && this.analytics.trackEvent(
      'Submit Transaction',
      `TransactionId: ${res.orderId}, Payment Code: ${res.paymentCode}`
    )),
    map((res: any | HttpErrorResponse) =>
      res instanceof HttpErrorResponse
        ? new fromActions.SubmitBucketFail()
        : new fromActions.SubmitBucketSucc()
    )
  );

  private handleSideSuccess({ paymentCode, restaurantId, price }): void {
    this.store.dispatch(
      new fromRouteActions.Push(
        new _Route("code", {
          paymentCode,
          restaurantId,
          price
        })
      )
    );
    this.store.dispatch(new fromTransactionActions.FetchTransactions({}));
  }

  private handleSideFail(): void {
    new fromToastActions.Show(
      "Nie udało się zrealizować zamówienia. Proszę, sprawdź dostęp do internetu i spróbuj jeszcze raz."
    );
  }

  private handleRestaurantSwitch(
    offer: Offer,
    bucket: Bucket
  ): Observable<any | HttpErrorResponse> {
    return (!bucket.restaurantId ||
      offer.restaurantId === bucket.restaurantId) &&
      offer.name !== "Kebab"
      ? of([offer, bucket])
      : new Observable((observer) => {
          this.store.dispatch(
            new fromAlertActions.Show(
              new _Alert({
                isShown: true,
                title: "Zmiana Restauracji",
                message:
                  "Posiadasz w koszyku produktu z innej restauracji. Chcesz utworzyć nowy koszyk z wybranym produktem?",
                buttons: ["Tak", "Nie"],
                callbacks: [
                  () =>
                    observer.next([
                      offer,
                      {
                        restaurantId: offer.restaurantId,
                        count: 0,
                        price: 0,
                        offers: []
                      }
                    ]),
                  () => observer.next(new HttpErrorResponse({}))
                ]
              })
            )
          );
        });
  }
}
