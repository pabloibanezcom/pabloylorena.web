import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UtilService } from '../../../shared/services/util.service';
import { DataService } from '../../../shared/services/data.service';
import { AdminService } from '../../services/admin.service';
import { GuestsResult } from '../../models/guestsResult';

import * as guestsTableConfig from './guest-table-config.json';
import * as tablesTableConfig from './table-table-config.json';
import { Guest } from '../../../shared/models/guest';
import { Table } from '../../../shared/models/table';

@Component({
  selector: 'app-table-planner',
  templateUrl: './table-planner.component.html',
  styleUrls: ['./table-planner.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TablePlannerComponent implements OnInit, OnDestroy {

  public guestsTableConfig: any;
  public tablesTableConfig: any;
  public guests: Guest[];
  public tables: Table[];
  public selectedGuest: Guest;
  public selectedTable: Table;
  public deleteMode: boolean;
  public tablesSummary: { total: number, complete: number, incomplete: number };
  subscriptions: Subscription[];
  types: any;

  constructor(
    private util: UtilService,
    private adminService: AdminService,
    private dataService: DataService
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.guestsTableConfig = guestsTableConfig;
    this.tablesTableConfig = tablesTableConfig;
    this.tablesTableConfig.new_element.click = this.addTable.bind(this);
    this.tablesTableConfig.other_actions[0].click = this.editTable.bind(this);
    this.tablesTableConfig.other_actions[1].click = this.removeTable.bind(this);
    this.guestsTableConfig.other_actions[0].click = this.assignTable.bind(this);
    this.subscriptions['getGroupNames'] = this.adminService.getGroupNames().subscribe(res => {
      this.guestsTableConfig.selects.find(s => s.label === 'Grupo').options = res;
    });
    this.refreshGuestResult();
    this.refreshTablesResult();
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  refreshGuestResult() {
    this.subscriptions['getGuestsResult'] = this.adminService.getGuestsTablesResult().subscribe(res => {
      this.guests = res.filter(g => g.isAttendingExpectation && ( g.table === null || g.table === undefined) && g.type < 4);
    });
  }

  refreshTablesResult() {
    this.subscriptions['getTablesResult'] = this.adminService.getTablesResult().subscribe(res => {
      this.tables = res;
      this.tablesSummary = {
        total: this.tables.length,
        complete: this.tables.filter(t => t.guests.length === t.size).length,
        incomplete: this.tables.filter(t => t.guests.length !== t.size).length
      }
    });
  }

  assignTable(guest: Guest) {
    this.selectedGuest = guest;
    this.util.showModal('rsvp-guest-table-modal');
  }

  addTable() {
    this.deleteMode = false;
    this.selectedTable = new Table();
    this.util.showModal('rsvp-table-modal');
  }

  editTable(table: Table) {
    this.deleteMode = false;
    this.selectedTable = table;
    this.util.showModal('rsvp-table-modal');
  }

  removeTable(table: Table) {
    this.deleteMode = true;
    this.selectedTable = table;
    this.util.showModal('rsvp-table-modal');
  }

  afterGuestTableModal(event: any) {
    if (event.refreshData) {
      this.refreshGuestResult();
      this.refreshTablesResult();
    }
    this.util.hideModal('rsvp-guest-table-modal');
  }

  afterTableModal(event: any) {
    this.deleteMode = false;
    if (event.refreshData) {
      this.refreshGuestResult();
      this.refreshTablesResult();
    }
    this.util.hideModal('rsvp-table-modal');
  }

}
