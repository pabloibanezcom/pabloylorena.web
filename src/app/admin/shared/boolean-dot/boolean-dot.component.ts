import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-boolean-dot',
  templateUrl: './boolean-dot.component.html',
  styleUrls: ['./boolean-dot.component.less']
})
export class BooleanDotComponent {

  @Input() modal: String;
  @Input() value: boolean;
  @Input() size: number;

  @Output() customClick: any = new EventEmitter();

  constructor() { }

  fireClick() {
    this.customClick.emit();
  }

}
