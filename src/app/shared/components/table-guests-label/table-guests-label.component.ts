import { Component, Input } from '@angular/core';
import { Guest } from '../../models/guest';

@Component({
  selector: 'app-table-guests-label',
  templateUrl: './table-guests-label.component.html',
  styleUrls: ['./table-guests-label.component.less']
})
export class TableGuestsLabelComponent {

  @Input() guests: Guest[];
  @Input() size: number;

  constructor() { }

}
