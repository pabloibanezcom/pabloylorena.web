import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.less']
})
export class FormButtonComponent {

  @Input() submit: boolean;
  @Input() class: string;
  @Input() label: string;
  @Output() click: any = new EventEmitter();

  constructor() { }

  fireClick(event) {
    event.stopPropagation();
    this.click.emit();
  }

}
