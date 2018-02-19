import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Invitation } from '../../../shared/models/invitation';
import { Guest } from '../../../shared/models/guest';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-rsvp-modal',
  templateUrl: './rsvp-modal.component.html',
  styleUrls: ['./rsvp-modal.component.less']
})
export class RsvpModalComponent implements OnInit, OnDestroy {

  @Input() editMode: boolean;
  @Input() invitation: Invitation;

  rsvpForm: FormGroup;
  subscriptions: Subscription[];
  selectedGuest: Guest;
  types: any[];
  stayingPlaces: any[];

  constructor(
    private dataService: DataService
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.rsvpForm = new FormGroup({
      'name': new FormControl(null),
      'type': new FormControl(null),
      'email': new FormControl(null),
      'phone': new FormControl(null),
      'isAttending': new FormControl(null),
      'stayingPlace': new FormControl(null),
      'allergies': new FormControl(null)
    });

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
    if (this.editMode) {
      console.log('Edit');
    } else {
      console.log('New');
    }
  }

  addGuest() {
    const newGuest = new Guest();
    newGuest._id = 'temp_' + Date.now();
    newGuest.name = 'Invitado 1';
    newGuest.type = 1;
    this.invitation.guests.push(newGuest);
    this.selectedGuest = newGuest;
  }

}
