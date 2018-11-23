import { Component, ViewChild } from "@angular/core";
import { IonicPage, ViewController, NavParams, Slides } from "ionic-angular";
import { Offer } from "../../core/models/offer";
import {
  Observable,
  Subscription,
  BehaviorSubject,
  combineLatest,
  of
} from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../core/app-state";
import { pluck, take, map, filter } from "rxjs/operators";
import * as fromBucketActions from "../../core/actions/bucket.actions";
import * as fromToastActions from "../../core/actions/_toast.actions";

@IonicPage({
  name: "offerModal"
})
@Component({
  selector: "offer-modal",
  templateUrl: "offer-modal.html"
})
export class OfferModalComponent {
  @ViewChild(Slides)
  public slides: Slides;

  public isBucket: boolean;
  public offers$: Observable<Offer[]>;
  public currentSlide$: BehaviorSubject<number>;
  public nextImage: string;
  public prevImage: string;

  private indexChangeSub: Subscription;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private store: Store<AppState>
  ) {
    this.currentSlide$ = new BehaviorSubject<number>(-1);
  }

  ngOnInit(): void {HTMLElement
    this.initCollection();

  }

  ngOnDestroy(): void {
    this.unsubscribeIndexChange();
  }

  private initCollection(): void {
    this.isBucket = this.navParams.get("isBucket");
    this.offers$ = this.isBucket
      ? this.store.select("bucket").pipe(pluck("offers"))
      : this.store.select("offer").pipe(pluck("data"));
  }

  public slideToSelected(): void {
    const sub: Subscription = this.offers$
      .pipe(
        take(1),
        map((offers) => this.selectImages(offers))
      )
      .subscribe(({ index, nextImage, prevImage }) => {
        setTimeout(() => {
          index && this.slides.slideTo(index, 10);
          this.nextImage = nextImage;
          this.prevImage = prevImage;
          sub && sub.unsubscribe();
          this.subscribeIndexChange();
        }, 150);
      });
  }

  private subscribeIndexChange(): void {
    this.indexChangeSub = combineLatest(
      this.offers$,
      this.currentSlide$
        .asObservable()
        .pipe(filter((index: number) => index > -1))
    )
      .pipe(map(([offers, index]) => this.selectImages(offers, index)))
      .subscribe(({ nextImage, prevImage }) => {
        this.nextImage = nextImage;
        this.prevImage = prevImage;
      });
  }

  private unsubscribeIndexChange(): void {
    this.indexChangeSub && this.indexChangeSub.unsubscribe();
  }

  private selectImages(
    offers: Offer[],
    selectedIndex?: number
  ): {
    index: number;
    nextImage: string;
    prevImage: string;
  } {
    const index: number =
      selectedIndex ||
      offers.findIndex(
        (offer: Offer) => offer.id === this.navParams.get("offerId")
      );

    return {
      index,
      nextImage: index !== offers.length - 1 ? offers[index + 1].image : null,
      prevImage: index !== 0 ? offers[index - 1].image : null
    };
  }

  public slideWillChange(): void {
    console.log('slide will change', this.slides.getActiveIndex());
  }

  public slideChanged(): void {
    this.currentSlide$.next(this.slides.getActiveIndex());
  }

  public slideNext(): void {
    this.slides && this.slides.slideNext();
  }

  public slidePrev(): void {
    this.slides && this.slides.slidePrev();
  }

  public close(): void {
    this.viewCtrl.dismiss();
  }

  public addToBucket(offer: Offer): void {
    this.store.dispatch(new fromBucketActions.AddToBucket(offer));
    this.store.dispatch(new fromToastActions.Show("Dodano do koszyka."));
  }

  public removeFromBucket(offerId: string): void {
    if (this.isBucket) {
      const sub: Subscription = this.offers$
        .pipe(
          take(1),
          map((offers: Offer[]) =>
            offers.reduce(
              (count: number, offer: Offer) => count + offer.count,
              0
            )
          )
        )
        .subscribe((count: number) => {
          count === 1 && this.close();
          this.store.dispatch(new fromBucketActions.RemoveFromBucket(offerId));
          this.store.dispatch(new fromToastActions.Show("Usunięto z koszyka."));
          sub && sub.unsubscribe();
        });
    } else {
      this.store.dispatch(new fromBucketActions.RemoveFromBucket(offerId));
      this.store.dispatch(new fromToastActions.Show("Usunięto z koszyka."));
    }
  }
}
