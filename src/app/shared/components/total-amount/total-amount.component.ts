import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../../admin/admin-core';

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.less']
})
export class TotalAmountComponent implements OnInit {

  @Input() amount: number;
  @Input() amountPaid: number;
  @Input() costPerGuest: boolean;
  expectedGuests: number;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.expectedGuests = this.adminService.getExpectedGuests();
  }

}
