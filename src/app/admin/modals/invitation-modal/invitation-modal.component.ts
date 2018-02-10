import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../services/notification.service';
import { Group } from '../../../shared/models/group';
import { Invitation } from '../../../shared/models/invitation';
import { Guest } from '../../../shared/models/guest';

@Component({
  selector: 'app-invitation-modal',
  templateUrl: './invitation-modal.component.html',
  styleUrls: ['./invitation-modal.component.less']
})
export class InvitationModalComponent implements OnInit, OnChanges, OnDestroy {

  @Input() deleteMode: boolean;
  @Input() invitation: Invitation;
  @Output() ending: any = new EventEmitter();

  groups: Group[];
  modalInvitation: Invitation;
  subscriptions: Subscription[];

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.setModalInvitation(this.invitation);
    this.refreshGroups();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.invitation) {
      this.setModalInvitation(changes.invitation.currentValue);
    }
    this.refreshGroups();
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  onSubmit() {
    if (this.invitation.alias) {
      this.updateInvitation();
    } else {
      this.addInvitation();
    }
  }

  addInvitation() {
    this.subscriptions['addInvitation'] = this.adminService.createInvitation(this.modalInvitation)
      .subscribe(res => this.afterSubscribe(res));
  }

  updateInvitation() {
    this.subscriptions['editInvitation'] = this.adminService.updateInvitation(this.modalInvitation)
      .subscribe(res => this.afterSubscribe(res));
  }

  confirmDelete() {
    this.subscriptions['removeInvitation'] = this.adminService.removeInvitation(this.modalInvitation)
      .subscribe(res => this.afterSubscribe(res));
  }

  cancel() {
    this.setModalInvitation(this.invitation);
    this.ending.emit({ refreshData: false });
  }

  private afterSubscribe(res: Response) {
    this.ending.emit({ refreshData: true });
    if (this.invitation && !this.invitation.guid && !this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Invitacion creada con exito',
        this.modalInvitation.alias + ' ha sido creada.');
    }
    if (this.invitation && this.invitation.guid && !this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Invitacion actualizada con exito',
        this.modalInvitation.alias + ' ha sido actualizada.');
    }
    if (this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Invitacion eliminada con exito',
        this.modalInvitation.alias + ' ha sido eliminada.');
    }
    this.invitation = null;
  }

  private setModalInvitation(invitation: Invitation): void {
    if (invitation) {
      this.modalInvitation = Object.assign({}, invitation);
    } else {
      this.modalInvitation = new Invitation();
    }
  }

  private refreshGroups(): void {
    this.subscriptions['groups'] = this.adminService.getGroupNames().subscribe(res => {
      this.groups = res;
    });
  }

}
