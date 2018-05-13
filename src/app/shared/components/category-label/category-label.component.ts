import { Component, Input } from '@angular/core';
import { ExpenseCategory } from '../../models';

@Component({
  selector: 'app-category-label',
  templateUrl: './category-label.component.html',
  styleUrls: ['./category-label.component.less']
})
export class CategoryLabelComponent {

  @Input() category: ExpenseCategory;


}
