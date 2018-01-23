import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadingSpinnerService {

  private isLoading$: BehaviorSubject<boolean>;
  private isLoadingObservable$: Observable<boolean>;

  constructor() {
    this.isLoading$ = new BehaviorSubject<boolean>(false);
   }

  startRequest(): void {
    this.isLoading$.next(true);
  }

  completeRequest(): void {
    this.isLoading$.next(false);
  }

  isLoading(): Observable<boolean> {
    if (!this.isLoadingObservable$) {
      this.isLoadingObservable$ = this.isLoading$.asObservable();
    }
    return this.isLoadingObservable$.share();
  }

}
