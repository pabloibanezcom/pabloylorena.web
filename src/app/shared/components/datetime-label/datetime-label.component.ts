import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-datetime-label',
  templateUrl: './datetime-label.component.html',
  styleUrls: ['./datetime-label.component.less']
})
export class DatetimeLabelComponent {

  @Input() dateTime: Date;

}
