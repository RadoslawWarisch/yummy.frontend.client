import { NgModule } from "@angular/core";
import { LoginFormComponent } from "./login-form/login-form";
import { DirectivesModule } from "../directives/directives.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "ionic-angular";
import { MapContainerComponent } from "./map-container/map-container";
import { SideHeaderComponent } from './side-header/side-header';
import { RestaurantItemComponent } from './restaurant-item/restaurant-item';
import { LazyScrollComponent } from './lazy-scroll/lazy-scroll';
import { OfferItemComponent } from './offer-item/offer-item';
import { BucketSummaryComponent } from './bucket-summary/bucket-summary';
import { NoItemsComponent } from './no-items/no-items';
import { SummaryCardComponent } from './summary-card/summary-card';
import { SignupFormComponent } from "./signup-form/signup-form";
import { SlideFirstComponent } from './slide-first/slide-first';
import { SlideSecondComponent } from './slide-second/slide-second';
import { SlideThirdComponent } from './slide-third/slide-third';
import { ListModeIconComponent } from "./list-mode-icon/list-mode-icon";
import { TransactionItemComponent } from './transaction-item/transaction-item';

@NgModule({
  declarations: [
    LoginFormComponent,
    MapContainerComponent,
    SideHeaderComponent,
    RestaurantItemComponent,
    LazyScrollComponent,
    OfferItemComponent,
    BucketSummaryComponent,
    NoItemsComponent,
    SummaryCardComponent,
    SignupFormComponent,
    SlideFirstComponent,
    SlideSecondComponent,
    SlideThirdComponent,
    ListModeIconComponent,
    TransactionItemComponent
  ],
  imports: [
    IonicModule,
    DirectivesModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    LoginFormComponent,
    MapContainerComponent,
    SideHeaderComponent,
    RestaurantItemComponent,
    LazyScrollComponent,
    OfferItemComponent,
    BucketSummaryComponent,
    NoItemsComponent,
    SummaryCardComponent,
    SignupFormComponent,
    SlideFirstComponent,
    SlideSecondComponent,
    SlideThirdComponent,
    ListModeIconComponent,
    TransactionItemComponent
  ]
})
export class ComponentsModule {}
