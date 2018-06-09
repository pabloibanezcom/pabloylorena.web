import { Component, OnInit } from '@angular/core';
import { NotificationType } from '../../../shared/models';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html'
})
export class NotificationModalComponent extends BaseModalComponent implements OnInit {

  public modelName = 'notification';
  types: NotificationType[];

  ngOnInit() {
    super.ngOnInit();
    this.types = this.adminService.getNotificationTypes();
  }

}
