import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.less']
})
export class FormTextComponent {

  @Input() multiLine: boolean;
  @Input() class: string;
  @Input() label: string;
  @Input() model: any;
  @Output() modelChange: any = new EventEmitter();

  constructor() { }

  updateData(event) {
    this.model = event;
    this.modelChange.emit(event);
  }

}
