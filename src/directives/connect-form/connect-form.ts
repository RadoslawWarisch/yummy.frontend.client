import { Directive } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Input } from '@angular/core';

@Directive({
  selector: '[connectForm]'
})
export class ConnectFormDirective {

  @Input('connectForm')
  set data(val: any) {
    if (val) {
      this.formGroupDirective.form.patchValue(val);
      this.formGroupDirective.form.markAsPristine();
    }
  }
  constructor(private formGroupDirective: FormGroupDirective) {}

}
