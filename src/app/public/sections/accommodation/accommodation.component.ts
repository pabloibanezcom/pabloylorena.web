import { Component, OnInit } from '@angular/core';
import * as hotels from './hotels.json';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.less']
})
export class AccommodationComponent implements OnInit {

  public hotels: any;

  constructor() { }

  ngOnInit() {
    this.hotels = hotels;
  }

}
