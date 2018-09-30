import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionsPage } from './transactions';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionsPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class TransactionsPageModule {}
