import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-money-label',
  templateUrl: './money-label.component.html',
  styleUrls: ['./money-label.component.less']
})
export class MoneyLabelComponent {

  @Input() amount: number;

  constructor() { }

}
