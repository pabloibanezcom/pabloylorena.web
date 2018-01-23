import { Component, OnInit, OnDestroy, Input,  } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoadingSpinnerService } from './loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.less']
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  loading: boolean;

  constructor(
    private loadingSpinnerService: LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.subscription = this.loadingSpinnerService.isLoading().subscribe(res => { this.loading = res; });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
