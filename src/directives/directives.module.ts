import { NgModule } from '@angular/core';
import { ConnectFormDirective } from './connect-form/connect-form';
import { OnInitDirective } from './on-init/on-init';
@NgModule({
	declarations: [ConnectFormDirective,
    OnInitDirective],
	imports: [],
	exports: [ConnectFormDirective,
    OnInitDirective]
})
export class DirectivesModule {}
