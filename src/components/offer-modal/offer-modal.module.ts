import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { OfferModalComponent } from "./offer-modal";
import { ComponentsModule } from "../components.module";
import { DirectivesModule } from "../../directives/directives.module";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [
    OfferModalComponent
  ],
  imports: [
    IonicPageModule.forChild(OfferModalComponent),
    DirectivesModule,
    TranslateModule,
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    OfferModalComponent
  ]
})
export class OfferModalModule {}