import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BucketPage } from './bucket';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BucketPage,
  ],
  imports: [
    IonicPageModule.forChild(BucketPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class BucketPageModule {}
