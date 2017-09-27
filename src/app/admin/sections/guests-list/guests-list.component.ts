import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';
import { GuestListResult } from '../../models/guestListResult';

@Component({
  selector: 'app-guests-list',
  templateUrl: './guests-list.component.html',
  styleUrls: ['./guests-list.component.less']
})
export class GuestsListComponent implements OnInit {

  public result: GuestListResult;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.adminService.getGuestListResult().subscribe(res => {
      this.result = res;
    });
  }

}
