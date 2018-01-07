import { Component } from '@angular/core';

import { Options } from 'angular2-notifications';
import { AdminService } from '../services/admin.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.less']
})
export class AdminBaseComponent {

  public sectionId: Number;
  public notificationOptions: Options;

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {
    this.sectionId = this.adminService.getCurrentSection();
    this.notificationOptions = this.notificationService.getOptions();
  }

  changeSection(sectionId: Number) {
    this.adminService.setCurrentSection(sectionId);
    this.sectionId = sectionId;
  }

}
