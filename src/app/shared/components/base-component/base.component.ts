import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-base-component',
  template: ''
})
export class BaseComponent implements OnDestroy {

  private _subscriptions: Subscription[];

  constructor() {
    this._subscriptions = [];
  }

  storeSubscription(subscription: Subscription): void {
    this._subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
