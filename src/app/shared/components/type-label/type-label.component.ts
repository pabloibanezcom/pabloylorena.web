import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-type-label',
  templateUrl: './type-label.component.html',
  styleUrls: ['./type-label.component.less']
})
export class TypeLabelComponent {

  @Input() type: number;

  constructor() { }

}
