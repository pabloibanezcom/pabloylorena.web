import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hotel-box',
  templateUrl: './hotel-box.component.html',
  styleUrls: ['./hotel-box.component.less']
})
export class HotelBoxComponent implements OnInit {

  @Input() hotel: any;

  constructor() { }

  ngOnInit() {
  }

}
