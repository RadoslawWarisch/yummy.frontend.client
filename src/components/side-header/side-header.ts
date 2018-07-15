import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'side-header',
  templateUrl: 'side-header.html'
})
export class SideHeaderComponent {

  @Input() label: string;
  @Input() iconPath: string;
  @Output() closeEmitter: EventEmitter<void>;

  constructor() {
    this.closeEmitter = new EventEmitter<void>();
  }

}
