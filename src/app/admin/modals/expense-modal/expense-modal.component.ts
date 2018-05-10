import { Component } from '@angular/core';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.less']
})
export class ExpenseModalComponent extends BaseModalComponent {

  public modelName: string = 'expense';

}
