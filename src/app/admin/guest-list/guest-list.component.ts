import { Component } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Table } from '../../shared/models';
import { AdminService } from '../admin-core';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.less']
})
export class GuestListComponent {

  result: Observable<Table[]>;

  constructor(private adminService: AdminService) {
    this.result = this.adminService.search('guestsList');
  }

  print(): void {
    window.print();
  }

}
