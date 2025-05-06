import { Directive, Input, HostListener, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[afterValueChanged]'
})
export class AfterValueChangedDirective implements OnDestroy {
  @Output()
  public afterValueChanged: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public valueChangeDelay = 1000;

  private stream: Subject<string> = new Subject<string>();
  private subscription: Subscription;

  constructor() {
    this.subscription = this.stream
      .pipe(debounceTime(this.valueChangeDelay))
      .subscribe((value: string) => this.afterValueChanged.next(value));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('valueChange', [ '$event' ])
  public onValueChange(value: string): void {
    this.stream.next(value);
  }
}
