import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../services/notification.service';
import { Group } from '../../../shared/models/group';
import { Invitation } from '../../../shared/models/invitation';
import { Guest } from '../../../shared/models/guest';
import { DataService } from '../../../shared/services/data.service';

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
  editorOptions: any;
  dedicationMode: string;
  dedication: string;
  defaultDedication: string;
  guestOrderChanged: boolean;

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private dataService: DataService
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.editorOptions = {
      placeholderText: 'Escribe la dedicatoria aquí',
      toolbarButtons: ['bold', 'italic', 'underline'],
      toolbarButtonsXS: ['bold', 'italic', 'underline'],
      toolbarButtonsSM: ['bold', 'italic', 'underline'],
      toolbarButtonsMD: ['bold', 'italic', 'underline']
    };
    this.setModalInvitation(this.invitation);
    this.refreshGroups();
    this.subscriptions.push(
      this.dataService.get('default-dedication').subscribe(data => {
        this.defaultDedication = data.htmlText;
      })
    );
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
    this.applyCustomizedDedication();
    this.subscriptions['addInvitation'] = this.adminService.createInvitation(this.modalInvitation)
      .subscribe(res => this.afterSubscribe(res));
  }

  updateInvitation() {
    this.applyCustomizedDedication();
    this.subscriptions['editInvitation'] = this.adminService.updateInvitation(this.modalInvitation)
      .subscribe(res => this.afterSubscribe(res));
    if (this.guestOrderChanged) {
      this.modalInvitation.guests.forEach(guest => {
        this.subscriptions['editGuest_' + guest._id] = this.adminService.updateGuestOrder(guest)
        .subscribe(res => {});
      });
    }
  }

  confirmDelete() {
    this.subscriptions['removeInvitation'] = this.adminService.removeInvitation(this.modalInvitation)
      .subscribe(res => this.afterSubscribe(res));
  }

  cancel() {
    this.setModalInvitation(this.invitation);
    this.ending.emit({ refreshData: false });
  }

  setDedication(dedicationMode: string) {
    this.dedicationMode = dedicationMode ? dedicationMode : 'default';
    this.modalInvitation.dedicationMode = this.dedicationMode;
    if (this.dedicationMode === 'default') {
      this.dedication = this.defaultDedication;
    }
    if (this.dedicationMode === 'group') {
      this.dedication = this.modalInvitation.group.invitationDedication;
    }
    if (this.dedicationMode === 'customized') {
      this.dedication = this.modalInvitation.dedication;
    }
  }

  moveGuestUp(guest: Guest) {
    this.move(this.modalInvitation.guests, guest, -1);
  }

  moveGuestDown(guest: Guest) {
    this.move(this.modalInvitation.guests, guest, 1);
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
    this.setDedication(this.modalInvitation.dedicationMode);
  }

  private refreshGroups(): void {
    this.subscriptions['groups'] = this.adminService.getGroupNames().subscribe(res => {
      this.groups = res;
    });
  }

  private applyCustomizedDedication() {
    if (this.dedicationMode === 'customized') {
      this.modalInvitation.dedication = this.dedication;
    }
  }

  private move(array, element, delta) {
    this.guestOrderChanged = true;
    const index = array.indexOf(element);
    const newIndex = index + delta;
    if (newIndex < 0  || newIndex == array.length) return; 
    const indexes = [index, newIndex].sort(); 
    array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]);
    this.updateGuestsOrders();
  }

  private updateGuestsOrders() {
    this.modalInvitation.guests.forEach((guest, i) => {
      guest.order = i;
    });
  }

}
