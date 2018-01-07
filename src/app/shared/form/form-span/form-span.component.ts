import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-span',
  templateUrl: './form-span.component.html',
  styleUrls: ['./form-span.component.less']
})
export class FormSpanComponent {

  @Input() class: string;
  @Input() label: string;
  @Input() model: string;

  constructor() { }

}
