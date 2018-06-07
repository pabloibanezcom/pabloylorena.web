import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../shared/components/base-component/base.component';
import { Table } from '../../shared/models';
import { AdminService } from '../admin-core';

@Component({
  selector: 'app-street-table',
  templateUrl: './street-table.component.html',
  styleUrls: ['./street-table.component.less']
})
export class StreetTableComponent extends BaseComponent implements OnInit {

  public table: Table;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
  ) {
    super();
  }

  ngOnInit() {
    this.storeSubscription(this.route.params.subscribe(params => {
      if (params.tableId) {
        this.storeSubscription(this.adminService.getElement(params.tableId, 'table').subscribe(res => this.table = res));
      }
    }));
  }


}
