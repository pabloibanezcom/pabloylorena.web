import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Response } from '@angular/http';

import { UtilService } from '../../../shared/services/util.service';
import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../services/notification.service';
import { Invitation } from '../../../shared/models/invitation';
import { Guest } from '../../../shared/models/guest';

declare var jQuery: any;

@Component({
  selector: 'app-invitation-modal',
  templateUrl: './invitation-modal.component.html',
  styleUrls: ['./invitation-modal.component.less']
})
export class InvitationModalComponent implements OnChanges {

  @Input() invitation: Invitation;
  @Output() ending: any = new EventEmitter();

  private isNew: boolean;
  modalInvitation: Invitation;
  public activeGuestIndex: Number;
  public typeOptions: any[] = [{ value: 0, label: 'Hombre' }, { value: 1, label: 'Mujer' }, { value: 2, label: 'Niño' } ];

  constructor(
    private utilService: UtilService,
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.invitation.currentValue) {
      this.activeGuestIndex = null;
      this.modalInvitation = this.utilService.cloneInvitation(changes.invitation.currentValue);
      this.isNew = false;
    } else {
      this.modalInvitation = new Invitation();
      this.isNew = true;
    }
  }

  onSubmit() {
    if (this.isNew) {
      this.addInvitation();
    } else {
      this.updateInvitation();
    }
  }

  changeActiveGuest(index: Number) {
    this.activeGuestIndex = this.activeGuestIndex === index ? null : index;
  }

  addGuest() {
    this.modalInvitation.guests.push(new Guest());
    this.activeGuestIndex = this.modalInvitation.guests.length - 1;
  }

  addInvitation() {

  }

  updateInvitation() {
    // this.adminService.updateInvitation(this.modalInvitation).subscribe(
    //   res => {
    //     this.afterSubscribe(res);
    //   },
    //   error => {
    //     this.afterSubscribe(error);
    //   });
  }

  afterSubscribe(res: Response) {
    jQuery('#rsvp-invitation-modal').modal('hide');
    this.ending.emit();
    this.notificationService.processHttpResult(res, 'Invitado actualizado con exito',
      this.modalInvitation.alias + ' ha sido actualizado con exito');
  }

}
