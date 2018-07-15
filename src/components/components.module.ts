import { NgModule } from "@angular/core";
import { LoginFormComponent } from "./login-form/login-form";
import { SignupFormComponent } from "./signup-form/signup-form";
import { DirectivesModule } from "../directives/directives.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "ionic-angular";
import { YummyHeaderComponent } from "./yummy-header/yummy-header";
import { MapContainerComponent } from "./map-container/map-container";
import { SideHeaderComponent } from './side-header/side-header';

@NgModule({
  declarations: [
    LoginFormComponent,
    SignupFormComponent,
    YummyHeaderComponent,
    MapContainerComponent,
    SideHeaderComponent
  ],
  imports: [
    IonicModule,
    DirectivesModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    LoginFormComponent,
    SignupFormComponent,
    YummyHeaderComponent,
    MapContainerComponent,
    SideHeaderComponent
  ]
})
export class ComponentsModule {}
