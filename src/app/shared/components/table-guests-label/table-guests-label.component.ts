import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-guests-label',
  templateUrl: './table-guests-label.component.html',
  styleUrls: ['./table-guests-label.component.less']
})
export class TableGuestsLabelComponent {

  @Input() guests: number;
  @Input() size: number;

  constructor() { }

}
