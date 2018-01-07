import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { HttpService } from './http.service';
import { Invitation } from '../models/invitation';

@Injectable()
export class InvitationService {

  constructor(
    private http: HttpService
  ) { }

  getInvitations(): Observable<Invitation[]> {
    const path = 'admin/invitations';
    return this.http.get(path);
  }

  getInvitation(guid: string, isAdmin: boolean): Observable<Invitation> {
    const path = isAdmin ? 'admin/invitation/' : 'invitation/';
    return this.http.get(path + guid);
  }

  updateInvitation(guid: string, isAdmin: boolean, invitation: Invitation): Observable<Invitation> {
    const path = isAdmin ? 'admin/invitation/' : 'invitation/';
    return this.http.put(path, invitation);
  }

}

