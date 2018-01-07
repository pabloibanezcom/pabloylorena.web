import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.less']
})
export class FormSelectComponent implements OnInit {

  @Input() class: string;
  @Input() label: string;
  @Input() optionsData: string;
  @Input() model: any;
  @Output() modelChange: any = new EventEmitter();

  options: any[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.get(this.optionsData).subscribe(options => {
      this.options = options;
    });
  }

  updateData(event) {
    this.model = event;
    this.modelChange.emit(event);
  }

}
