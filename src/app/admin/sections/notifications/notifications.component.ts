import { Component, Injector } from '@angular/core';
import { NotificationService } from '../../admin-core/services/notification.service';
import { SmsService } from '../../admin-core/services/sms.service';
import { BaseSectionComponent } from '../base-section/base-section.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent extends BaseSectionComponent {

  public modelName = 'notification';

  constructor(
    private smsService: SmsService,
    private notificationService: NotificationService,
    injector: Injector
  ) {
    super(injector);
  }

  afterTableConfig() {
    this.tableConfig.other_actions[0].click = this.sendNotification.bind(this);
    this.tableConfig.other_actions[1].click = this.editElement.bind(this);
    this.tableConfig.other_actions[2].click = this.removeElement.bind(this);
  }

  sendNotification(element: Notification) {
    this.selectedElement = element;
    this.util.showModal('rsvp-confirm-modal');
  }

  onConfirmSent() {
    this.smsService.send(this.selectedElement).subscribe(res => {
      this.util.hideModal('rsvp-confirm-modal');
      this.notificationService.success('Mensaje enviado', '');
      this.refreshResult();
    });
  }

  onCancelConfirm() {
    this.util.hideModal('rsvp-confirm-modal');
  }

}
