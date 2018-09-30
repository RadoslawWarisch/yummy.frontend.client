import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodePage } from './code';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CodePage,
  ],
  imports: [
    IonicPageModule.forChild(CodePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class CodePageModule {}
