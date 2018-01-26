import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UtilService } from '../../../shared/services/util.service';
import { AdminService } from '../../services/admin.service';
import { GroupsResult } from '../../models/groupsResult';

import * as tableConfig from './group-table-config.json';
import { Group } from '../../../shared/models/group';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less']
})
export class GroupsComponent implements OnInit, OnDestroy {

  public tableConfig: any;
  public result: GroupsResult;
  public selectedGroup: Group;
  public deleteMode: boolean;
  subscriptions: Subscription[];

  constructor(
    private util: UtilService,
    private adminService: AdminService
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.tableConfig = tableConfig;
    this.tableConfig.selects.find(s => s.label === 'Anfitrion').options = [
      {
        'host': 'Pablo'
      },
      {
        'host': 'Lorena'
      },
      {
        'host': 'Ambos'
      }
    ];
    this.refreshGroupsResult();
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  refreshGroupsResult() {
    this.subscriptions['getGroupsResult'] = this.adminService.getGroupsResult().subscribe(res => {
      this.result = res;
    });
  }

}
