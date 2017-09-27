import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Response } from '@angular/http';

import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../services/notification.service';
import { Invitation } from '../../../shared/models/invitation';

declare var jQuery: any;

@Component({
  selector: 'app-invitation-modal',
  templateUrl: './invitation-modal.component.html',
  styleUrls: ['./invitation-modal.component.less']
})
export class InvitationModalComponent implements OnInit, OnChanges {

  @Input() invitation: Invitation;
  @Output() ending: any = new EventEmitter();

  private modalInvitation: Invitation;

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    if (!this.invitation) {
      this.invitation = new Invitation();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.invitation) {
      this.modalInvitation = Object.assign({}, changes.invitation.currentValue);
    }
  }

  updateInvitation() {
    this.adminService.updateInvitation(this.modalInvitation).subscribe(
      res => {
        this.afterSubscribe(res);
      },
      error => {
        this.afterSubscribe(error);
      });
  }

  afterSubscribe(res: Response) {
    jQuery('#rsvp-invitation-modal').modal('hide');
    this.ending.emit();
    this.notificationService.processHttpResult(res, 'Invitado actualizado con exito',
      this.modalInvitation.alias + ' ha sido actualizado con exito');
  }

}
