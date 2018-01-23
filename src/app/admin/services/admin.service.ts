import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../shared/services/http.service';
import { Group } from '../../shared/models/group';
import { Table } from '../../shared/models/table';
import { Invitation } from '../../shared/models/invitation';
import { Guest } from '../../shared/models/guest';
import { CollectionsResult } from '../models/collectionsResult';
import { InvitationsResult } from '../models/invitationsResult';
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

  getInvitationsResult(): Observable<InvitationsResult> {
    return this.search('invitationsResult');
  }

  getGuestsResult(): Observable<GuestsResult> {
    return this.search('guestsResult');
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

  // -------------------------

  private search(searchName: string): Observable<any> {
    const searchReqOptions = searchRequests[searchName];
    return this.http.post(searchReqOptions.url, searchReqOptions.body)
      .map(collection => this[searchName + 'Map'] ? this[searchName + 'Map'](collection) : collection);
  }

  private invitationsResultMap(groups: Group[]): InvitationsResult {
    return this.checkSentInvitationsInGroups(groups);
  }

  private guestsResultMap(guests: Guest[]): GuestsResult {
    return this.checkAttendingGuests(guests);
  }

  private checkSentInvitationsInGroups(groups: Group[]): InvitationsResult {
    let awaiting = 0;
    let sent = 0;
    groups.map(g => g.invitations.map(inv => {
      if (inv.isSent) { sent++; } else { awaiting++; }
    }));
    groups.map(g => {
      g.guestsAmount = 0;
      g.invitations.map(inv => g.guestsAmount += inv.guests.length);
    });
    return {
      groups: groups,
      invitationsAwaiting: awaiting,
      invitationsSent: sent
    };
  }

  private checkAttendingGuests(guests: Guest[]): GuestsResult {
    return {
      guests: guests,
      attending: guests.filter(g => g.isAttending).length,
      awaiting: guests.filter(g => !g.isAttending).length
    };
  }

}
