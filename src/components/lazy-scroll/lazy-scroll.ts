import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'lazy-scroll',
  templateUrl: 'lazy-scroll.html'
})
export class LazyScrollComponent {

  @Input() public isLoading: boolean;
  @Input() public toBottom: number = 600;
  @Output() public pullDown: EventEmitter<void>;

  public pullDown$: Subject<void>;
  public pullDownSub: Subscription;

  constructor() {
    this.pullDown = new EventEmitter<void>();
    this.pullDown$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.pullDownSub = this.pullDown$.asObservable()
      .filter(() => !this.isLoading)
      .throttleTime(1500)
      .subscribe(() => this.pullDown.next());
  }

  ngOnDestroy(): void {
    this.pullDownSub.unsubscribe();
  }
  
}
