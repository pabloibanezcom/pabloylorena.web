import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../shared/services/http.service';
import { Invitation } from '../../shared/models/invitation';

@Injectable()
export class InvitationService {

  constructor(
    private http: HttpService
  ) { }

  getInvitationByGuid(guid: string): Observable<Invitation> {
    return this.http.get('invitation/guid/' + guid);
  }

}

