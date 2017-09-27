import { Component, OnInit } from '@angular/core';

import { MapService } from '../../../shared/services/map.service';
import { MapOptions } from '../../../shared/models/map-options';

@Component({
  selector: 'app-wedding-map',
  templateUrl: './wedding-map.component.html',
  styleUrls: ['./wedding-map.component.less']
})
export class WeddingMapComponent implements OnInit {

  map: google.maps.Map;
  mapOptions: MapOptions;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapOptions = {
      zoom: 10,
      center: new google.maps.LatLng(39.9923744, -5.6430674),
      minZoom: 9,
      maxZoom: 17
    };
    this.map = this.mapService.createMap('map', this.mapOptions);
    this.mapService.setMarker(
      this.map,
      'Ceremonia',
      new google.maps.LatLng(39.8911989, -5.5426375),
      'assets/images/marker/ceremony.png',
      '<div class="note">Ceremonia</div><h4 class="map-title script">Parroquia de San Andrés Apóstol</h4>'
      + '<div class="address"><span class="region">Calle Antonio Concha, 8</span><br><span class="postal-code">10300</span>'
      + '<br><span class="city-name">Navalmoral de la Mata, Cáceres</span></div>'
    );
    this.mapService.setMarker(
      this.map,
      'Banquete',
      new google.maps.LatLng(40.1271366, -5.668199),
      'assets/images/marker/reception.png',
      '<div class="note">Banquete</div><h4 class="map-title script">Hotel Ruta Imperial</h4>'
      + '<div class="address"><span class="region">Calle Machoteral</span><br><span class="postal-code">10450</span>'
      + '<br><span class="city-name">Jarandilla de la Vera, Cáceres</span></div>'
    );
  }

}
