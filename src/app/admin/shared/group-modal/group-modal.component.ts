import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../services/notification.service';
import { Group } from '../../../shared/models/group';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.less']
})
export class GroupModalComponent implements OnInit, OnChanges, OnDestroy {

  @Input() deleteMode: boolean;
  @Input() group: Group;
  @Output() ending: any = new EventEmitter();

  modalGroup: Group;
  subscriptions: Subscription[];

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.setModalGroup(this.group);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.group) {
      this.setModalGroup(changes.group.currentValue);
    }
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  onSubmit() {
    if (this.group.name) {
      this.updateGroup();
    } else {
      this.addGroup();
    }
  }

  addGroup() {
    this.subscriptions['addGroup'] = this.adminService.createGroup(this.modalGroup)
      .subscribe(res => this.afterSubscribe(res));
  }

  updateGroup() {
    this.subscriptions['editGroup'] = this.adminService.updateGroup(this.modalGroup)
      .subscribe(res => this.afterSubscribe(res));
  }

  confirmDelete() {
    this.subscriptions['removeGroup'] = this.adminService.removeGroup(this.modalGroup)
      .subscribe(res => this.afterSubscribe(res));
  }

  cancel() {
    this.setModalGroup(this.group);
    this.ending.emit({ refreshData: false });
  }

  private afterSubscribe(res: Response) {
    this.ending.emit({ refreshData: true });
    if (!this.group && !this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Invitado creado con exito',
        this.modalGroup.name + ' ha sido creado.');
    }
    if (this.group && !this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Invitado actualizado con exito',
        this.modalGroup.name + ' ha sido actualizado.');
    }
    if (this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Invitado eliminado con exito',
        this.modalGroup.name + ' ha sido eliminado.');
    }
    this.group = null;
  }

  private setModalGroup(group: Group): void {
    if (group) {
      this.modalGroup = Object.assign({}, group);
    } else {
      this.modalGroup = new Group();
    }
  }

}
