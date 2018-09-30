import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlidePage } from './slide';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SlidePage,
  ],
  imports: [
    IonicPageModule.forChild(SlidePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class SlidePageModule {}
