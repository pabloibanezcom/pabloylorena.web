import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Guest, Table } from '../../../shared/models';
import { DataService } from '../../../shared/services/data.service';
import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-guest-table-modal',
  templateUrl: './guest-table-modal.component.html'
})
export class GuestTableModalComponent implements OnInit, OnChanges, OnDestroy {

  @Input() guest: Guest;
  @Output() ending: any = new EventEmitter();

  modalGuest: Guest;
  subscriptions: Subscription[];
  tables: Table[];

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private dataService: DataService
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.setModalGuest(this.guest);
    this.refreshTables();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.guest) {
      this.setModalGuest(changes.guest.currentValue);
      this.refreshTables();
    }
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  onSubmit() {
    this.assignTable();
  }

  assignTable() {
    this.modalGuest.orderInTable = 99;
    this.subscriptions['editGuest'] = this.adminService.updateGuest(this.modalGuest)
      .subscribe(res => this.afterSubscribe(res));
  }

  cancel() {
    this.setModalGuest(this.guest);
    this.ending.emit({ refreshData: false });
  }

  private afterSubscribe(res: Response) {
    this.ending.emit({ refreshData: true });
    this.notificationService.processHttpResult(res, 'Invitado asignado a mesa con exito',
      this.modalGuest.name + ' ha sido asignado.');
    this.guest = null;
  }

  private setModalGuest(guest: Guest): void {
    if (guest) {
      this.modalGuest = Object.assign({}, guest);
    } else {
      this.modalGuest = new Guest();
    }
  }

  private refreshTables(): void {
    this.subscriptions['tables'] = this.adminService.getTableNames().subscribe(res => {
      this.tables = res.map(t => Object.assign(t, { fullName: t.number + ' - ' + t.name }));
    });
  }

}
