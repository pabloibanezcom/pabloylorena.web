import { Component, Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Group, Guest, Invitation, Table } from '../../../shared/models';
import { DataService } from '../../../shared/services/data.service';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-guest-modal',
  templateUrl: './guest-modal.component.html'
})
export class GuestModalComponent extends BaseModalComponent implements OnInit, OnChanges {

  public modelName = 'guest';
  groups: Group[];
  tables: Table[];
  group: Group;
  invitations: Invitation[];
  types: any[];
  busTimes: any[];
  stayingPlaces: any[];

  constructor(
    private dataService: DataService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.refreshGroupsInvitations();
    this.refreshTables();
    this.storeSubscription(this.dataService.get('types').subscribe(data => {
      this.types = data.options;
    }));
    this.storeSubscription(this.dataService.get('bus-times').subscribe(data => {
      this.busTimes = data.options;
    }));
    this.storeSubscription(this.dataService.get('staying-places').subscribe(data => {
      this.stayingPlaces = data.options;
    }));
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.refreshGroupsInvitations();
    this.refreshTables();
  }

  setGroup(groupId: any) {
    this.invitations = this.groups.find(g => g['_id'] === groupId).invitations;
  }

  protected setModalElement(guest: Guest): void {
    this.group = new Group();
    if (guest) {
      this.modalElement = Object.assign({}, guest);
      if (guest.invitation) {
        this.group = guest.invitation['group'];
        this.setGroup(this.group['_id']);
      }
    } else {
      this.modalElement = new Guest();
    }
  }

  private refreshGroupsInvitations(): void {
    this.storeSubscription(this.adminService.getGroupWithInvitations().subscribe(res => {
      this.groups = res;
    }));
  }

  private refreshTables(): void {
    this.storeSubscription(this.adminService.getTableNames().subscribe(res => {
      this.tables = res.map(t => Object.assign(t, { fullName: t.number + ' - ' + t.name }));
    }));
  }

}
