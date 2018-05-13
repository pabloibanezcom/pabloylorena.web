import { Component, OnInit } from '@angular/core';
import { BaseSectionComponent } from '../base-section/base-section.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html'
})
export class ExpensesComponent extends BaseSectionComponent implements OnInit {

  public modelName: string = 'expense';

  ngOnInit() {
    this.storeSubscription(this.adminService.refreshExpectedGuests().subscribe(res => {
      super.ngOnInit();
    }));
  }

  afterTableConfig() {
    this.storeSubscription(this.adminService.getExpenseCategories().subscribe(res => {
      this.tableConfig.selects.find(s => s.label === 'Categoria').options = res;
    }));
  }

}
