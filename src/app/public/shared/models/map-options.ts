import { } from '@types/googlemaps';

export interface MapOptions {
    zoom: number;
    center: google.maps.LatLng;
    minZoom: number;
    maxZoom: number;
}
