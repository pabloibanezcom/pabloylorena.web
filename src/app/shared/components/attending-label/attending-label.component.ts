import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-attending-label',
  templateUrl: './attending-label.component.html',
  styleUrls: ['./attending-label.component.less']
})
export class AttendingLabelComponent {

  @Input() isAttending: boolean;

  constructor() { }

}
