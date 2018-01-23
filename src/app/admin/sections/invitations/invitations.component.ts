import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AdminService } from '../../services/admin.service';
import { InvitationsResult } from '../../models/invitationsResult';
import { Invitation } from '../../../shared/models/invitation';
import { Guest } from '../../../shared/models/guest';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.less']
})
export class InvitationsComponent implements OnInit {

  public result: InvitationsResult;
  public activeInvitationIndex: Number;
  public selectedInvitation: Invitation;
  public selectedGuest: Guest;

  resultSubscription: Subscription;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.refreshResults();
  }

  refreshResults() {
    if (this.resultSubscription) {
      this.resultSubscription.unsubscribe();
    }
    this.resultSubscription = this.adminService.getInvitationsResult().subscribe(res => {
      this.result = res;
    });
  }

  changeActiveInvitation(index: Number) {
    this.activeInvitationIndex = this.activeInvitationIndex === index ? null : index;
  }

  editInvitation(selectedInvitation: Invitation) {
    this.selectedInvitation = selectedInvitation;
  }

  clearInvitation() {
    this.selectedInvitation = null;
    this.activeInvitationIndex = null;
  }

  editGuest(selectedGuest: Guest) {
    this.selectedGuest = selectedGuest;
  }

}
