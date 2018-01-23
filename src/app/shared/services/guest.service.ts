import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { HttpService } from '../../shared/services/http.service';
import { Guest } from '../models/guest';

@Injectable()
export class GuestService {

  constructor(private http: HttpService) { }

  getGuests(): Observable<Guest[]> {
    return this.http.get('guests');
  }

  addGuest(guest: Guest) {
    return this.http.post('guests', guest);
  }

}
