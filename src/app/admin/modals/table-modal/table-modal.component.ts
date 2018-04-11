import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../services/notification.service';
import { DataService } from '../../../shared/services/data.service';
import { Table } from '../../../shared/models/table';
import { Guest } from '../../../shared/models/guest';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.less']
})
export class TableModalComponent implements OnInit, OnChanges, OnDestroy {

  @Input() deleteMode: boolean;
  @Input() table: Table;
  @Output() ending: any = new EventEmitter();

  public showRemoveConfirm: string;
  modalTable: Table;
  subscriptions: Subscription[];
  guestOrderChanged: boolean;
  refreshData: boolean;

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private dataService: DataService
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.setModalTable(this.table);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.table) {
      this.setModalTable(changes.table.currentValue);
    }
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  onSubmit() {
    if (this.table.name) {
      this.updateTable();
    } else {
      this.addTable();
    }
  }

  addTable() {
    this.subscriptions['addTable'] = this.adminService.createTable(this.modalTable)
      .subscribe(res => this.afterSubscribe(res));
  }

  updateTable() {
    this.subscriptions['editTable'] = this.adminService.updateTable(this.modalTable)
      .subscribe(res => this.afterSubscribe(res));
    if (this.guestOrderChanged) {
      this.modalTable.guests.forEach(guest => {
        this.subscriptions['editGuest_' + guest._id] = this.adminService.updateGuestOrderInTable(guest)
          .subscribe(res => { });
      });
    }
  }

  confirmDelete() {
    this.subscriptions['removeTable'] = this.adminService.removeTable(this.modalTable)
      .subscribe(res => this.afterSubscribe(res));
  }

  cancel() {
    this.setModalTable(this.table);
    this.ending.emit({ refreshData: this.refreshData });
  }

  removeFromTable(guest: Guest) {
    guest.table = null;
    guest.orderInTable = null;
    this.subscriptions['editGuest_' + guest._id] = this.adminService.updateGuest(guest)
      .subscribe(res => {
        this.modalTable.guests = this.modalTable.guests.filter(g => g._id !== guest._id);
        this.showRemoveConfirm = null;
        this.refreshData = true;
        this.notificationService.processHttpResult(res, 'Invitado quitado de la mesa',
          guest.name + ' ha sido quitado de la mesa ' + this.modalTable.name);
      });
  }

  moveGuestUp(guest: Guest) {
    this.move(this.modalTable.guests, guest, -1);
  }

  moveGuestDown(guest: Guest) {
    this.move(this.modalTable.guests, guest, 1);
  }

  private afterSubscribe(res: Response) {
    this.ending.emit({ refreshData: true });
    if (!this.table && !this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Invitado creado con exito',
        this.modalTable.name + ' ha sido creado.');
    }
    if (this.table && !this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Invitado actualizado con exito',
        this.modalTable.name + ' ha sido actualizado.');
    }
    if (this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Invitado eliminado con exito',
        this.modalTable.name + ' ha sido eliminado.');
    }
    this.table = null;
  }

  private setModalTable(table: Table): void {
    if (table) {
      this.modalTable = Object.assign({}, table);
    } else {
      this.modalTable = new Table();
    }
  }

  private move(array, element, delta) {
    this.guestOrderChanged = true;
    const index = array.indexOf(element);
    const newIndex = index + delta;
    if (newIndex < 0 || newIndex == array.length) return;
    const indexes = [index, newIndex].sort();
    array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]);
    this.updateGuestsOrders();
  }

  private updateGuestsOrders() {
    this.modalTable.guests.forEach((guest, i) => {
      guest.orderInTable = i;
    });
  }


}
