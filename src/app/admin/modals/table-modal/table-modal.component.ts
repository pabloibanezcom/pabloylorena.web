import { Component, Injector } from '@angular/core';
import { Guest } from '../../../shared/models';
import { DataService } from '../../../shared/services/data.service';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.less']
})
export class TableModalComponent extends BaseModalComponent {

  public modelName: string = 'table';
  public showRemoveConfirm: string;
  guestOrderChanged: boolean;
  refreshData: boolean;

  constructor(
    private dataService: DataService,
    injector: Injector
  ) {
    super(injector);
  }

  updateElement() {
    super.updateElement();
    if (this.guestOrderChanged) {
      this.modalElement.guests.forEach(guest => {
        this.storeSubscription(this.adminService.updateGuestOrderInTable(guest)
          .subscribe(res => { }));
      });
    }
  }

  removeFromTable(guest: Guest) {
    guest.table = null;
    guest.orderInTable = null;
    this.storeSubscription(this.adminService.updateGuest(guest)
      .subscribe(res => {
        this.modalElement.guests = this.modalElement.guests.filter(g => g._id !== guest._id);
        this.showRemoveConfirm = null;
        this.refreshData = true;
        this.notificationService.processHttpResult(res, 'Invitado quitado de la mesa',
          guest.name + ' ha sido quitado de la mesa ' + this.modalElement.name);
      }));
  }

  moveGuestUp(guest: Guest) {
    this.move(this.modalElement.guests, guest, -1);
  }

  moveGuestDown(guest: Guest) {
    this.move(this.modalElement.guests, guest, 1);
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
      guest.orderInTable = i;
    });
  }


}
