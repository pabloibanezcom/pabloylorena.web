import { Component } from '@angular/core';
import { BaseSectionComponent } from '../base-section/base-section.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html'
})
export class ExpensesComponent extends BaseSectionComponent {

  public modelName: string = 'expense';

}
