import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UtilService } from '../../../shared/services/util.service';
import { AdminService } from '../../services/admin.service';
import { GuestsResult } from '../../models/guestsResult';

import * as tableConfig from './guest-table-config.json';
import * as types from './types.json';
import { Guest } from '../../../shared/models/guest';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.less']
})
export class GuestsComponent implements OnInit, OnDestroy {

  public tableConfig: any;
  public result: GuestsResult;
  public selectedGuest: Guest;
  public deleteMode: boolean;
  subscriptions: Subscription[];
  types: any;

  constructor(
    private util: UtilService,
    private adminService: AdminService
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.tableConfig = tableConfig;
    this.tableConfig.new_element.click = this.addGuest.bind(this);
    this.tableConfig.other_actions[0].click = this.editGuest.bind(this);
    this.tableConfig.other_actions[1].click = this.removeGuest.bind(this);
    this.tableConfig.selects.find(s => s.label === 'Genero').options = types;
    this.tableConfig.selects.find(s => s.label === 'Asistencia').options =
      [{ label: 'Asiste', value: true }, { label: 'No asiste', value: false }];
    this.subscriptions['getGroupNames'] = this.adminService.getGroupNames().subscribe(res => {
      this.tableConfig.selects.find(s => s.label === 'Grupo').options = res;
    });
    this.subscriptions['getTableNames'] = this.adminService.getTableNames().subscribe(res => {
      this.tableConfig.selects.find(s => s.label === 'Mesa').options = res;
    });
    this.refreshGuestResult();
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  refreshGuestResult() {
    this.subscriptions['getGuestsResult'] = this.adminService.getGuestsResult().subscribe(res => {
      this.result = res;
    });
  }

  addGuest() {
    this.deleteMode = false;
    this.selectedGuest = new Guest();
    this.util.showModal('rsvp-guest-modal');
  }

  editGuest(guest: Guest) {
    this.deleteMode = false;
    this.selectedGuest = guest;
    this.util.showModal('rsvp-guest-modal');
  }

  removeGuest(guest: Guest) {
    this.deleteMode = true;
    this.selectedGuest = guest;
    this.util.showModal('rsvp-guest-modal');
  }

  afterGuestModal(event: any) {
    this.deleteMode = false;
    if (event.refreshData) {
      this.refreshGuestResult();
    }
    this.util.hideModal('rsvp-guest-modal');
  }

}
