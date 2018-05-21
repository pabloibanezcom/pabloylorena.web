import { Component, Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Group, Guest, Invitation } from '../../../shared/models';
import { DataService } from '../../../shared/services/data.service';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-invitation-modal',
  templateUrl: './invitation-modal.component.html',
  styleUrls: ['./invitation-modal.component.less']
})
export class InvitationModalComponent extends BaseModalComponent implements OnInit, OnChanges {

  public modelName: string = 'invitation';
  groups: Group[];
  editorOptions: any;
  dedicationMode: string;
  dedication: string;
  defaultDedication: string;
  guestOrderChanged: boolean;

  constructor(
    private dataService: DataService,
    injector: Injector
  ) {
    super(injector);
    this.editorOptions = {
      placeholderText: 'Escribe la dedicatoria aquí',
      toolbarButtons: ['bold', 'italic', 'underline'],
      toolbarButtonsXS: ['bold', 'italic', 'underline'],
      toolbarButtonsSM: ['bold', 'italic', 'underline'],
      toolbarButtonsMD: ['bold', 'italic', 'underline']
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.refreshGroups();
    this.storeSubscription(this.dataService.get('default-dedication').subscribe(data => {
      this.defaultDedication = data.htmlText;
    }));
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.refreshGroups();
  }

  updateElement() {
    this.applyCustomizedDedication();
    super.updateElement();
    if (this.guestOrderChanged) {
      this.modalElement.guests.forEach(guest => {
        this.storeSubscription(this.adminService.updateGuestOrder(guest)
          .subscribe(res => { }));
      });
    }
  }

  setDedication(dedicationMode: string) {
    this.dedicationMode = dedicationMode ? dedicationMode : 'default';
    this.modalElement.dedicationMode = this.dedicationMode;
    if (this.dedicationMode === 'default') {
      this.dedication = this.defaultDedication;
    }
    if (this.dedicationMode === 'group') {
      this.dedication = this.modalElement.group.invitationDedication;
    }
    if (this.dedicationMode === 'customized') {
      this.dedication = this.modalElement.dedication;
    }
  }

  moveGuestUp(guest: Guest) {
    this.move(this.modalElement.guests, guest, -1);
  }

  moveGuestDown(guest: Guest) {
    this.move(this.modalElement.guests, guest, 1);
  }

  protected setModalElement(invitation: Invitation): void {
    super.setModalElement(invitation);
    if (this.modalElement) {
      this.setDedication(this.modalElement.dedicationMode);
    }
  }

  protected beforeAddOrUpdate() {
    this.modalElement.giftAmount = parseInt(this.modalElement.giftAmount);
  }

  private refreshGroups(): void {
    this.storeSubscription(this.adminService.getGroupNames().subscribe(res => {
      this.groups = res;
    }));
  }

  private applyCustomizedDedication() {
    if (this.dedicationMode === 'customized') {
      this.modalElement.dedication = this.dedication;
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
    this.modalElement.guests.forEach((guest, i) => {
      guest.order = i;
    });
  }

}
