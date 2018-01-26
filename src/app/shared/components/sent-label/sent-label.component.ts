import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sent-label',
  templateUrl: './sent-label.component.html',
  styleUrls: ['./sent-label.component.less']
})
export class SentLabelComponent {

  @Input() isSent: boolean;

  constructor() { }

}
