import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Group } from '../../../shared/models/group';
import { UtilService } from '../../../shared/services/util.service';
import { GroupsResult } from '../../models/groupsResult';
import { AdminService } from '../../services/admin.service';
import * as tableConfig from './group-table-config.json';

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
    this.tableConfig.new_element.click = this.addGroup.bind(this);
    this.tableConfig.other_actions[0].click = this.editGroup.bind(this);
    this.tableConfig.other_actions[1].click = this.removeGroup.bind(this);
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

  addGroup() {
    this.deleteMode = false;
    this.selectedGroup = new Group();
    this.util.showModal('rsvp-group-modal');
  }

  editGroup(group: Group) {
    this.deleteMode = false;
    this.selectedGroup = group;
    this.util.showModal('rsvp-group-modal');
  }

  removeGroup(group: Group) {
    this.deleteMode = true;
    this.selectedGroup = group;
    this.util.showModal('rsvp-group-modal');
  }

  afterModal(event: any) {
    this.deleteMode = false;
    if (event.refreshData) {
      this.refreshGroupsResult();
    }
    this.util.hideModal('rsvp-group-modal');
  }

}
