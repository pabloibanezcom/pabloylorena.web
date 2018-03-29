import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../shared/services/http.service';
import { Group } from '../../shared/models/group';
import { Table } from '../../shared/models/table';
import { Invitation } from '../../shared/models/invitation';
import { Guest } from '../../shared/models/guest';
import { OverviewResult } from '../models/overviewResult';
import { CollectionsResult } from '../models/collectionsResult';
import { InvitationsResult } from '../models/invitationsResult';
import { GroupsResult } from '../models/groupsResult';
import { GuestsResult } from '../models/guestsResult';
import * as searchRequests from './search-requests.json';

@Injectable()
export class AdminService {

  private groups: Group[];
  private invitations: Invitation[];

  constructor(private http: HttpService) { }

  getGroupNames(): Observable<Group[]> {
    return this.search('groupNames');
  }

  getGroupWithInvitations(): Observable<Group[]> {
    return this.search('groupWithInvitations');
  }

  getTableNames(): Observable<Table[]> {
    return this.search('tableNames');
  }

  getOverviewResult(): Observable<OverviewResult> {
    return this.http.get('overview/report');
  }

  getInvitationsResult(): Observable<InvitationsResult> {
    return this.search('invitationsResult');
  }

  getGuestsResult(): Observable<GuestsResult> {
    return this.search('guestsResult');
  }

  getGroupsResult(): Observable<GroupsResult> {
    return this.search('groupsResult');
  }

  // -------- GUEST ----------

  createGuest(newGuest: Guest) {
    return this.http.postWithResponse('guest/add', newGuest);
  }

  updateGuest(guest: Guest) {
    return this.http.putWithResponse('guest/' + guest._id, guest);
  }

  removeGuest(guest: Guest) {
    return this.http.deleteWithResponse('guest/' + guest._id);
  }

  updateGuestOrder(guest: Guest) {
    return this.http.putWithResponse('guest/order/' + guest._id, { order: guest.order });
  }

  // -------------------------


  // -------- INVITATION ----------

  getInvitation(invitationId: string) {
    return this.http.get('invitation/' + invitationId);
  }

  createInvitation(newInvitation: Invitation) {
    return this.http.postWithResponse('invitation/add', newInvitation);
  }

  updateInvitation(invitation: Invitation) {
    return this.http.putWithResponse('invitation/' + invitation._id, invitation);
  }

  removeInvitation(invitation: Invitation) {
    return this.http.deleteWithResponse('invitation/' + invitation._id);
  }

  // -------------------------

  // -------- GROUP ----------

  getGroup(groupId: string) {
    return this.http.get('group/' + groupId);
  }

  createGroup(newGroup: Group) {
    return this.http.postWithResponse('group/add', newGroup);
  }

  updateGroup(group: Group) {
    return this.http.putWithResponse('group/' + group._id, group);
  }

  removeGroup(group: Group) {
    return this.http.deleteWithResponse('group/' + group._id);
  }

  // -------------------------

  private search(searchName: string): Observable<any> {
    const searchReqOptions = searchRequests[searchName];
    return this.http.post(searchReqOptions.url, searchReqOptions.body)
      .map(collection => this[searchName + 'Map'] ? this[searchName + 'Map'](collection) : collection);
  }

  private invitationsResultMap(invitations: Invitation[]): InvitationsResult {
    return this.checkSentInvitations(invitations);
  }

  private guestsResultMap(guests: Guest[]): GuestsResult {
    return this.checkAttendingGuests(guests);
  }

  private groupsResultMap(groups: Group[]): GroupsResult {
    groups.forEach(g => {
      g.guestsAmount = 0;
      g.invitations.forEach(inv => {
        g.guestsAmount += inv.guests.length;
      });
    });
    return {
      groups: groups
    };
  }

  private checkSentInvitations(invitations: Invitation[]): InvitationsResult {
    return {
      invitations: invitations,
      invitationsSent: invitations.filter(i => i.isSent).length,
      invitationsAwaiting: invitations.filter(i => !i.isSent).length
    };
  }

  private checkAttendingGuests(guests: Guest[]): GuestsResult {
    return {
      guests: guests,
      attending: guests.filter(g => g.isAttending).length,
      awaiting: guests.filter(g => !g.isAttending).length,
      expected: guests.filter(g => g.isAttendingExpectation).length,
      nonExpected: guests.filter(g => g.isAttendingExpectation === false).length,
      doubtful: guests.filter(g => g.isAttendingExpectation == null).length
    };
  }

}
