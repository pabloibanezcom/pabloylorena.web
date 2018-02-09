import { Injectable } from '@angular/core';

import { MapOptions } from '../models/map-options';

@Injectable()
export class MapService {

  constructor() { }

  createMap(selector: string, options: MapOptions): google.maps.Map {
    return new google.maps.Map(document.getElementById(selector), {
      center: options.center,
      zoom: options.zoom,
      streetViewControl: false,
      zoomControl: true,
      mapTypeControl: false,
      scrollwheel: false
    });
  }

  setMarker(map: google.maps.Map, title: string, center: google.maps.LatLng, icon: string, contentWindow: string) {
    const marker = new google.maps.Marker({
      position: center,
      map: map,
      title: title,
      icon: icon
    })

    const infoWindow = new google.maps.InfoWindow({
      content: contentWindow
    });

    marker.addListener('click', event => {
      infoWindow.open(map, marker);
    });
  }

}
