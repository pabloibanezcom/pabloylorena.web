import { Component, OnInit } from '@angular/core';
import { ExpenseCategory } from '../../../shared/models';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html'
})
export class ExpenseModalComponent extends BaseModalComponent implements OnInit {

  public modelName: string = 'expense';
  categories: ExpenseCategory[];

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
