import { Component, OnInit } from '@angular/core';
import { ExpenseCategory } from '../../../shared/models';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html'
})
export class ExpenseModalComponent extends BaseModalComponent implements OnInit {

  public modelName = 'expense';
  categories: ExpenseCategory[];
  costPerGuestOptions: { label: string, value: number }[] = [
    {
      label: 'No',
      value: 0
    },
    {
      label: 'Adultos',
      value: 1
    },
    {
      label: 'Niños',
      value: 3
    }
  ];

  ngOnInit() {
    super.ngOnInit();
    this.refreshCategories();
  }

  private refreshCategories(): void {
    this.storeSubscription(this.adminService.getExpenseCategories().subscribe(res => {
      this.categories = res;
    }));
  }

}
