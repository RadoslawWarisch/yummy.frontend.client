import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/app-state';
import * as fromRouteActions from '../../core/actions/_route.actions';
import { _Route } from '../../core/models/_route';
import { Slides } from 'ionic-angular';

@IonicPage({
  name: 'slide'
})
@Component({
  selector: 'page-slide',
  templateUrl: 'slide.html',
})
export class SlidePage {
  @ViewChild(Slides) slides: Slides;
  public isWelcomeSlide: boolean = false;
  public isLastSlide: boolean = false;

  constructor(
    private store: Store<AppState>,
    private el: ElementRef
  ) {}

  public slideChanged() {
    (this.slides.getActiveIndex() === 2) && this.addBckg();
    (this.slides.getActiveIndex() === 3) && this.goToApp();
  }

  private addBckg(): void {
    this.isLastSlide = true;
  }

  private goToApp(): void {
    this.isWelcomeSlide = true;
    this.store.dispatch(new fromRouteActions.Root(new _Route("welcome")));
  }

}
