import { Component } from '@angular/core';

import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.less']
})
export class AdminBaseComponent {

  public sectionId: Number;

  constructor(
    private adminService: AdminService
  ) {
    this.sectionId = this.adminService.getCurrentSection();
  }

  changeSection(sectionId: Number) {
    this.adminService.setCurrentSection(sectionId);
    this.sectionId = sectionId;
  }

}
