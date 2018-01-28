import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../services/notification.service';
import { Group } from '../../../shared/models/group';
import { Invitation } from '../../../shared/models/invitation';
import { Table } from '../../../shared/models/table';
import { Guest } from '../../../shared/models/guest';

import * as busTimes from './bus-times.json';
import * as types from './types.json';

@Component({
  selector: 'app-guest-modal',
  templateUrl: './guest-modal.component.html',
  styleUrls: ['./guest-modal.component.less']
})
export class GuestModalComponent implements OnInit, OnChanges, OnDestroy {

  @Input() deleteMode: boolean;
  @Input() guest: Guest;
  @Output() ending: any = new EventEmitter();

  groups: Group[];
  tables: Table[];
  modalGuest: Guest;
  group: Group;
  subscriptions: Subscription[];
  busTimes: any;
  types: any;
  invitations: Invitation[];

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
  ) {
    this.subscriptions = [];
    this.busTimes = busTimes;
    this.types = types;
  }

  ngOnInit() {
    this.setModalGuest(this.guest);
    this.refreshGroupsInvitations();
    this.refreshTables();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.guest) {
      this.setModalGuest(changes.guest.currentValue);
    }
    this.refreshGroupsInvitations();
    this.refreshTables();
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  addGuest() {
    this.subscriptions['addGuest'] = this.adminService.createGuest(this.modalGuest)
      .subscribe(res => this.afterSubscribe(res));
  }

  updateGuest() {
    this.subscriptions['editGuest'] = this.adminService.updateGuest(this.modalGuest)
      .subscribe(res => this.afterSubscribe(res));
  }

  setGroup(groupId: any) {
    this.invitations = this.groups.find(g => g['_id'] === groupId).invitations;
  }

  confirmDelete() {
    this.subscriptions['removeGuest'] = this.adminService.removeGuest(this.modalGuest)
      .subscribe(res => this.afterSubscribe(res));
  }

  cancel() {
    this.setModalGuest(this.guest);
    this.ending.emit({ refreshData: false });
  }

  private afterSubscribe(res: Response) {
    this.ending.emit();
    if (!this.guest && !this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Invitado creado con exito',
        this.modalGuest.fullName + ' ha sido creado.');
    }
    if (this.guest && !this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Invitado actualizado con exito',
        this.modalGuest.fullName + ' ha sido actualizado.');
    }
    if (this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Invitado eliminado con exito',
        this.modalGuest.fullName + ' ha sido eliminado.');
    }
    this.guest = null;
  }

  private setModalGuest(guest: Guest): void {
    this.group = new Group();
    if (guest) {
      this.modalGuest = Object.assign({}, guest);
      if (guest.invitation) {
        this.group = guest.invitation['group'];
        this.setGroup(this.group['_id']);
      }
    } else {
      this.modalGuest = new Guest();
    }
  }

  private refreshGroupsInvitations(): void {
    this.subscriptions['groupsInvitations'] = this.adminService.getGroupWithInvitations().subscribe(res => {
      this.groups = res;
    });
  }

  private refreshTables(): void {
    this.subscriptions['tables'] = this.adminService.getTableNames().subscribe(res => {
      this.tables = res.map(t => Object.assign(t, { fullName: t.number + ' - ' + t.name }));
    });
  }

}
