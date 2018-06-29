import { Component } from '@angular/core';
import { Table } from '../../shared/models';
import { AdminService } from '../admin-core';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.less']
})
export class GuestListComponent {

  result: Table[];

  constructor(private adminService: AdminService) {
    this.adminService.search('guestsList').subscribe(res => this.result = res);
  }

  print(): void {
    window.print();
  }

}
