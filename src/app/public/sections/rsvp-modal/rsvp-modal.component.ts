import { Component, Input } from '@angular/core';

import { Invitation } from '../../../shared/models/invitation';

@Component({
  selector: 'app-rsvp-modal',
  templateUrl: './rsvp-modal.component.html',
  styleUrls: ['./rsvp-modal.component.less']
})
export class RsvpModalComponent {

  @Input() editMode: boolean;
  @Input() invitation: Invitation;

  constructor() { }

  onSubmit() {
    if (this.editMode) {
      console.log('Edit');
    } else {
      console.log('New');
    }

  }

}
