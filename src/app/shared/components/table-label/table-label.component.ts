import { Component, Input } from '@angular/core';

import { Table } from '../../models/table';

@Component({
  selector: 'app-table-label',
  templateUrl: './table-label.component.html',
  styleUrls: ['./table-label.component.less']
})
export class TableLabelComponent {

  @Input() table: Table;

  constructor() { }

}
