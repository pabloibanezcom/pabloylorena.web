import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.less']
})
export class FormSelectComponent implements OnInit, OnChanges {

  @Input() type: string;
  @Input() class: string;
  @Input() label: string;
  @Input() options: any[];
  @Input() optionLabel: string;
  @Input() optionValue: string;
  @Input() emptyOption: boolean;
  @Input() model: any;
  @Output() modelChange: any = new EventEmitter();

  // DEPRECATES - TO REMOVE
  @Input() optionsData: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.optionLabel = this.optionLabel ? this.optionLabel : 'label';
    this.optionValue = this.optionValue ? this.optionValue : 'value';
    if (!this.options) {
      this.setOptions();
    }
    this.updateModel();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.model) {
      this.updateModel();
    }
  }

  updateData(event) {
    this.model = event;
    this.modelChange.emit(event);
  }

  private setOptions() {
    if (this.type === 'YesNo') {
      this.options = [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
      ];
    }
  }

  private updateModel() {
    if (this.model && this.model[this.optionValue]) {
      this.model = this.model[this.optionValue];
    }
  }

}
