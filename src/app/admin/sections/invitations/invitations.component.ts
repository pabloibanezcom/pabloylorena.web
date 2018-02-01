import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UtilService } from '../../../shared/services/util.service';
import { AdminService } from '../../services/admin.service';
import { InvitationsResult } from '../../models/invitationsResult';

import * as tableConfig from './invitation-table-config.json';
import { Invitation } from '../../../shared/models/invitation';


@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.less']
})
export class InvitationsComponent implements OnInit, OnDestroy {

  public tableConfig: any;
  public result: InvitationsResult;
  public selectedInvitation: Invitation;
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
    this.tableConfig.new_element.click = this.addInvitation.bind(this);
    this.tableConfig.other_actions[0].click = this.viewInvitation.bind(this);
    this.tableConfig.other_actions[1].click = this.editInvitation.bind(this);
    this.tableConfig.other_actions[2].click = this.removeInvitation.bind(this);
    this.subscriptions['getGroupNames'] = this.adminService.getGroupNames().subscribe(res => {
      this.tableConfig.selects.find(s => s.label === 'Grupo').options = res;
    });
    this.refreshInvitationResult();
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  refreshInvitationResult() {
    this.subscriptions['getInvitationsResult'] = this.adminService.getInvitationsResult().subscribe(res => {
      this.result = res;
    });
  }

  viewInvitation(invitation: Invitation) {
    window.open('admin/invitation/' + invitation.guid);
  }

  addInvitation() {
    this.deleteMode = false;
    this.selectedInvitation = new Invitation();
    this.util.showModal('rsvp-invitation-modal');
  }

  editInvitation(invitation: Invitation) {
    this.deleteMode = false;
    this.selectedInvitation = invitation;
    this.util.showModal('rsvp-invitation-modal');
  }

  removeInvitation(invitation: Invitation) {
    this.deleteMode = true;
    this.selectedInvitation = invitation;
    this.util.showModal('rsvp-invitation-modal');
  }

  afterInvitationModal(event: any) {
    this.deleteMode = false;
    if (event.refreshData) {
      this.refreshInvitationResult();
    }
    this.util.hideModal('rsvp-invitation-modal');
  }

}
