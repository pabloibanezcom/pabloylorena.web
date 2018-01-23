import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.less']
})
export class FormTextComponent implements OnInit {

  @Input() type: string;
  @Input() multiLine: boolean;
  @Input() class: string;
  @Input() label: string;
  @Input() error: string;
  @Input() model: any;
  @Output() modelChange: any = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (!this.type) {
      this.type = 'text';
    }
  }

  updateData(event) {
    this.model = event;
    this.modelChange.emit(event);
  }

}
