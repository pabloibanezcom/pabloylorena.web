import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-countdown-box',
  templateUrl: './countdown-box.component.html',
  styleUrls: ['./countdown-box.component.less']
})
export class CountdownBoxComponent implements OnInit {

  timeDiff: any;

  constructor() { }

  ngOnInit() {
    this.timeDiff = moment.duration(moment('2018-07-21 18:30:00').diff(moment()));
  }

}
