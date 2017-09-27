import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Response } from '@angular/http';

import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../services/notification.service';
import { GuestService } from '../../../shared/services/guest.service';
import { Invitation } from '../../../shared/models/invitation';
import { Guest } from '../../../shared/models/guest';

declare var jQuery: any;

@Component({
  selector: 'app-guest-modal',
  templateUrl: './guest-modal.component.html',
  styleUrls: ['./guest-modal.component.less']
})
export class GuestModalComponent implements OnInit, OnChanges {

  @Input() invitations: Invitation[];
  @Input() guest: Guest;
  @Output() ending: any = new EventEmitter();

  private modalGuest: Guest;

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private guestService: GuestService
  ) {
  }

  ngOnInit() {
    if (!this.guest) {
      this.guest = new Guest();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.guest) {
      this.modalGuest = Object.assign({}, changes.guest.currentValue);
    }
  }

  addGuest() {
    this.guestService.addGuest(this.modalGuest).subscribe(res => {
      // console.log(res);
    });
  }

  updateGuest() {
    this.adminService.updateGuest(this.modalGuest).subscribe(
      res => {
        this.afterSubscribe(res);
      },
      error => {
        this.afterSubscribe(error);
      });
  }

  afterSubscribe(res: Response) {
    jQuery('#rsvp-guest-modal').modal('hide');
    this.ending.emit();
    this.notificationService.processHttpResult(res, 'Invitado actualizado con exito',
      this.modalGuest.fullName + ' ha sido actualizado con exito');
  }

}
