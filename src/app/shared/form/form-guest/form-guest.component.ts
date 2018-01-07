import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Guest} from '../../models/guest';

@Component({
  selector: 'app-form-guest',
  templateUrl: './form-guest.component.html',
  styleUrls: ['./form-guest.component.less']
})
export class FormGuestComponent {

  @Input() model: any;
  @Output() modelChange: any = new EventEmitter();

  constructor() { }

}
