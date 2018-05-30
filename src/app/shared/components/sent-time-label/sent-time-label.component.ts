import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sent-time-label',
  templateUrl: './sent-time-label.component.html',
  styleUrls: ['./sent-time-label.component.less']
})
export class SentTimeLabelComponent {

  @Input() dateTime: Date;

}
