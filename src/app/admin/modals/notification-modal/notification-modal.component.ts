import { Component, Injector, OnInit } from '@angular/core';
import { NotificationType } from '../../../shared/models';
import { DataService } from '../../../shared/services/data.service';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html'
})
export class NotificationModalComponent extends BaseModalComponent implements OnInit {

  public modelName = 'notification';
  types: NotificationType[];
  stayingPlaces: any[];

  constructor(
    private dataService: DataService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.types = this.adminService.getNotificationTypes();
    this.storeSubscription(this.dataService.get('staying-places').subscribe(data => {
      this.stayingPlaces = data.options;
    }));
  }

}
