import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BucketPage } from './bucket';

@NgModule({
  declarations: [
    BucketPage,
  ],
  imports: [
    IonicPageModule.forChild(BucketPage),
  ],
})
export class BucketPageModule {}
