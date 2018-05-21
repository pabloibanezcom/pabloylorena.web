import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared';
import { AdminService, OverviewResult } from '../../admin-core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent extends BaseComponent implements OnInit {

  public result: OverviewResult;

  constructor(private adminService: AdminService) {
    super();
  }

  ngOnInit() {
    this.refreshOverviewResult();
  }

  refreshOverviewResult() {
    this.storeSubscription(this.adminService.getOverviewResult().subscribe(res => {
      this.result = res;
    }));
  }

}
