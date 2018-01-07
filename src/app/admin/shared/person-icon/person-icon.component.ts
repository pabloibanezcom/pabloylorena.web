import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-person-icon',
  templateUrl: './person-icon.component.html',
  styleUrls: ['./person-icon.component.less']
})
export class PersonIconComponent {

  @Input() type: number;

  constructor() { }

}
