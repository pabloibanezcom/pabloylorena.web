import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { HttpService } from '../../shared/services/http.service';
import { Group } from '../../shared/models/group';
import { Invitation } from '../../shared/models/invitation';
import { Guest } from '../../shared/models/guest';
import { CollectionsResult } from '../models/collectionsResult';
import { InvitationResult } from '../models/invitationsResult';
import { GuestListResult } from '../models/guestListResult';

@Injectable()
export class AdminService {

  private groups: Group[];
  private invitations: Invitation[];

  constructor(private http: HttpService) { }

  getCurrentSection(): Number {
    const sectionId = localStorage.getItem('sectionId');
    return sectionId ? Number(sectionId) : 1;
  }

  setCurrentSection(sectionId: Number): void {
    localStorage.setItem('sectionId', sectionId.toString());
  }

  getInvitationsResult(): Observable<InvitationResult> {
    return this.getAllData().map(collections => this.processInvitations(collections));
  }

  getGuestListResult(): Observable<GuestListResult> {
    return this.getAllData().map(collections => this.processGuests(collections));
  }

  addGuest(guest: Guest) {
    return this.http.post('guests', guest);
  }

  updateInvitation(invitation: Invitation) {
    return this.http.put('invitations', invitation);
  }

  updateGuest(guest: Guest) {
    return this.http.put('guests', guest);
  }

  getInvitations(): Invitation[] {
    return this.invitations;
  }

  private getGroupsFromAPI(): Observable<Group[]> {
    return this.http.get('groups');
  }

  private getInvitationsFromAPI(): Observable<Invitation[]> {
    return this.http.get('admin/invitations');
  }

  private getGuestsFromAPI(): Observable<Guest[]> {
    return this.http.get('guests');
  }

  private getAllData(): Observable<CollectionsResult> {
    return Observable.create(observer => {
      const result = new CollectionsResult();
      this.getInvitationsFromAPI().subscribe(invitations => {
        result.invitations = invitations;
        this.invitations = invitations;
        this.getGuestsFromAPI().subscribe(guests => {
          result.guests = guests;
          observer.next(result);
          observer.complete();
        });
      }
      );
    });
  }

  private processInvitations(collections: CollectionsResult): InvitationResult {
    return {
      invitations: collections.invitations.map(inv => {
        inv.guests = this.guestGuestsFromInvitation(inv.guid, collections.guests);
        return inv;
      }),
      sent: collections.invitations.filter(inv => inv.isSent).length,
      awaiting: collections.invitations.filter(inv => !inv.isSent).length
    };
  }

  private processGuests(collections: CollectionsResult) {
    return {
      guests: collections.guests,
      attending: collections.guests.filter(g => g.isAttending).length,
      awaiting: collections.guests.filter(g => !g.isAttending).length
    };
  }

  private guestGuestsFromInvitation(invitationGuid: String, guests: Guest[]): Guest[] {
    return guests.filter(guest => guest.invitationGuid === invitationGuid).sort((a, b) => a.type - b.type);
  }

}
