import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AdminService, OverviewResult } from '../../admin-core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent implements OnInit, OnDestroy {

  public result: OverviewResult;
  subscription: Subscription;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.refreshOverviewResult();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshOverviewResult() {
    // this.subscription = this.adminService.getOverviewResult().subscribe(res => {
    //   this.result = res;
    // });
  }

}
