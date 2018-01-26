import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-replied-label',
  templateUrl: './replied-label.component.html',
  styleUrls: ['./replied-label.component.less']
})
export class RepliedLabelComponent {

  @Input() isReplied: boolean;

  constructor() { }

}
