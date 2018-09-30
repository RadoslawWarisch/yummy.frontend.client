import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { YummyHeaderComponent } from "./yummy-header";
import { IonicModule } from "ionic-angular";
import { ComponentsModule } from "../components.module";
import { DirectivesModule } from "../../directives/directives.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    YummyHeaderComponent
  ],
  imports: [
    IonicModule,
    DirectivesModule,
    TranslateModule,
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    YummyHeaderComponent
  ]
})
export class YummyHeaderModule {}