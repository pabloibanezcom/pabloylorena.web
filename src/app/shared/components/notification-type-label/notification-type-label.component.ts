import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AdminService } from '../../../admin/admin-core';
import { NotificationType } from '../../models';

@Component({
  selector: 'app-notification-type-label',
  templateUrl: './notification-type-label.component.html',
  styleUrls: ['./notification-type-label.component.less']
})
export class NotificationTypeLabelComponent implements OnInit, OnChanges {

  @Input() type: string;
  private types: NotificationType[];
  typeObj: NotificationType;

  constructor(private adminService: AdminService) {
    this.types = this.adminService.getNotificationTypes();
  }

  ngOnInit() {
    this.refreshType();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type) {
      this.refreshType();
    }
  }

  private refreshType() {
    this.typeObj = this.types.find(t => t.value === this.type);
  }

}
