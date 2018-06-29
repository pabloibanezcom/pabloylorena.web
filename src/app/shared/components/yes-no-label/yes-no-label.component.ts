import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-yes-no-label',
  templateUrl: './yes-no-label.component.html',
  styleUrls: ['./yes-no-label.component.less']
})
export class YesNoLabelComponent {

  @Input() value: boolean;

}
