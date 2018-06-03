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
  @Input() costPerGuest: number;
  expectedGuests: { adults: number, children: number };
  totalAmount: number;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.expectedGuests = this.adminService.getExpectedGuests();
    if (!this.costPerGuest || this.costPerGuest === 0) {
      this.totalAmount = this.amount;
    } else if (this.costPerGuest === 1) {
      this.totalAmount = this.amount * this.expectedGuests.adults;
    } else if (this.costPerGuest === 3) {
      this.totalAmount = this.amount * this.expectedGuests.children;
    }
  }

}
