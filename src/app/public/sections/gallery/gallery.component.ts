import { Component, OnInit} from '@angular/core';

import * as images from './images.json';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit {

  images: any;

  constructor() { }

  ngOnInit() {
    this.images = images;
  }

}
