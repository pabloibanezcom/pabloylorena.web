import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Invitation } from '../../../shared/models/invitation';
import { Guest } from '../../../shared/models/guest';
import { DataService } from '../../../shared/services/data.service';
import { AnalyticsService } from '../../services/analytics.service';
import { InvitationService } from '../../services/invitation.service';

@Component({
  selector: 'app-rsvp-modal',
  templateUrl: './rsvp-modal.component.html',
  styleUrls: ['./rsvp-modal.component.less']
})
export class RsvpModalComponent implements OnInit, OnDestroy {

  @Input() invitation: Invitation;

  subscriptions: Subscription[];
  errors: any;
  selectedGuest: Guest;
  types: any[];
  stayingPlaces: any[];
  invitationGuid: string;
  updated: boolean;

  constructor(
    private dataService: DataService,
    private analyticsService: AnalyticsService,
    private invitationService: InvitationService
  ) {
    this.subscriptions = [];
    this.errors = {};
  }

  ngOnInit() {
    this.subscriptions.push(
      this.dataService.get('types').subscribe(data => {
        this.types = data.options;
      })
    );
    this.subscriptions.push(
      this.dataService.get('staying-places').subscribe(data => {
        this.stayingPlaces = data.options;
      })
    );
    this.selectedGuest = this.invitation.guests[0];
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  onSubmit() {
    this.validateData();
    if (!this.hasErrors()) {
      this.updateInvitation();
    } else {
      console.log('Some Error!');
    }
    this.analyticsService.trackAttendanceCompleted(this.invitation);
  }

  onSubmitCode() {
    if (this.invitationGuid) {
      this.subscriptions.push(this.invitationService.getInvitationByGuid(this.invitationGuid).subscribe(
        res => {
          this.invitation = res;
          this.selectedGuest = this.invitation.guests[0];
          this.analyticsService.trackAttendanceGUIDSubmitted(this.invitation);
        },
        err => {
          this.errors['invitationGuid'] = { message: 'Invitacion no encontrada', ts: Date.now() };
          this.analyticsService.trackAttendanceGUIDNotFound(this.invitation, this.invitationGuid);
        }
      ));
    } else {
      this.errors['invitationGuid'] = { message: 'Introduce un codigo de invitación', ts: Date.now() };
    }
  }

  selectGuest(guest: Guest) {
    this.errors = {};
    this.selectedGuest = guest;
  }

  addGuest() {
    const newGuest = new Guest();
    newGuest._id = 'temp_' + Date.now();
    newGuest.name = 'Invitado 1';
    newGuest.type = 1;
    this.invitation.guests.push(newGuest);
    this.selectedGuest = newGuest;
  }

  private updateInvitation() {
    this.subscriptions.push(
      this.invitationService.confirmAttendance(this.invitation).subscribe(
        res => {
          this.updated = true;
        },
        err => {
          console.log(err);
        }
      )
    );
  }

  private validateData() {
    this.errors = {};
    let guestIndex = 0;
    while (guestIndex < this.invitation.guests.length) {
      if (!this.validateGuest(this.invitation.guests[guestIndex])) {
        this.selectedGuest = this.invitation.guests[guestIndex];
        guestIndex = this.invitation.guests.length;
      } else {
        guestIndex++;
      }
    }
  }

  private validateGuest(guest: Guest): boolean {
    let isValid = true;
    if (!guest.name) {
      isValid = false;
      this.errors['name'] = { message: 'Introduce un nombre', ts: Date.now() };
    }
    if (guest.isAttending === null || guest.isAttending === undefined) {
      isValid = false;
      this.errors['isAttending'] = { message: 'Indica asistencia', ts: Date.now() };
    }
    if (guest.stayingPlace === null || guest.stayingPlace === undefined) {
      isValid = false;
      this.errors['stayingPlace'] = { message: 'Indica alojamiento sábado', ts: Date.now() };
    }
    return isValid;
  }

  private hasErrors() {
    for (const prop in this.errors) {
      if (this.errors[prop]) {
        return true;
      }
    }
    return false;
  }

}
